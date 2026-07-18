/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const DEMO_EMAIL = "member@feralwear.pk";
const DEMO_PASSWORD = "Feral2026!";
const SESSION_SECONDS = 604800;
type D1Row = Record<string, string | number>;
const hex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
async function passwordHash(password: string, saltHex: string) {
  const salt = Uint8Array.from(saltHex.match(/.{1,2}/g) ?? [], (byte) => parseInt(byte, 16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: 120000 }, key, 256)));
}
async function authSchema(db: D1Database) {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, created_at INTEGER NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL)"),
    db.prepare("CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id)"),
  ]);
}
async function demoUser(db: D1Database) {
  await authSchema(db);
  if (await db.prepare("SELECT id FROM users WHERE email = ?").bind(DEMO_EMAIL).first()) return;
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  await db.prepare("INSERT INTO users (id, name, email, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(), "FERAL Member", DEMO_EMAIL, await passwordHash(DEMO_PASSWORD, salt), salt, Date.now()).run();
}
const json = (body: unknown, init: ResponseInit = {}) => new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...init.headers } });
async function authApi(request: Request, env: Env, path: string) {
  if (path === "/api/auth/login" && request.method === "POST") {
    const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
    if (!body?.email || !body.password || body.email.length > 254 || body.password.length > 128) return json({ error: "Email aur password required hain." }, { status: 400 });
    await demoUser(env.DB);
    const user = await env.DB.prepare("SELECT id, name, email, password_hash, password_salt FROM users WHERE email = ?").bind(body.email.trim().toLowerCase()).first<D1Row>();
    if (!user || await passwordHash(body.password, String(user.password_salt)) !== user.password_hash) return json({ error: "Email ya password durust nahi." }, { status: 401 });
    const sessionId = crypto.randomUUID() + crypto.randomUUID();
    await env.DB.prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(sessionId, user.id, Date.now() + SESSION_SECONDS * 1000, Date.now()).run();
    return json({ user: { name: user.name, email: user.email } }, { headers: { "Set-Cookie": `feral_session=${sessionId}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_SECONDS}` } });
  }
  if (path === "/api/auth/logout" && request.method === "POST") return json({ ok: true }, { headers: { "Set-Cookie": "feral_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" } });
  if (path === "/api/auth/session" && request.method === "GET") {
    await authSchema(env.DB);
    const id = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith("feral_session="))?.slice(14);
    if (!id) return json({ user: null });
    const user = await env.DB.prepare("SELECT users.name, users.email FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.id = ? AND sessions.expires_at > ?").bind(id, Date.now()).first<D1Row>();
    return json({ user: user ? { name: user.name, email: user.email } : null });
  }
  return json({ error: "Not found" }, { status: 404 });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/auth/")) return authApi(request, env, url.pathname);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
