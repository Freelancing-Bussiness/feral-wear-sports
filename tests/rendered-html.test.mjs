import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the FERAL Wear homepage and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>FERAL Wear — Unlock Your Feral<\/title>/i);
  assert.match(html, /UNLOCK/);
  assert.match(html, /TRAINING/);
  assert.match(html, /Nutrition content is general information, not medical advice/);
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /property="og:image" content="\/og.png"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders every commerce route", async () => {
  const routes = [
    ["/shop", /TEST ORDER FLOW/], ["/product", /ORDER THROUGH WHATSAPP/],
    ["/cart", /THE BAG/], ["/checkout", /CHECKOUT/], ["/sauna", /SWEAT IS NOT/],
    ["/nutrition", /EAT TO/], ["/nutrition/protein-basics", /PROTEIN BASICS/],
    ["/sale", /Sale/i], ["/men", /Men/i], ["/women", /Women/i], ["/kids", /Kids/i],
    ["/accessories", /Accessories/i], ["/nutrition-store", /Nutrition/i], ["/b2b", /B2B/i],
    ["/collections/men-compression", /Compression/i],
    ["/sauna/men", /MEN'S HEAT/i], ["/sauna/women", /WOMEN'S HEAT/i],
    ["/nutrition/basic-needs", /BASIC NEEDS/i], ["/nutrition/supplements", /SUPPORT THE BASE/i],
    ["/nutrition/diet-plans", /PLAN\. PREP\. REPEAT/i], ["/feral-code", /EARN THE DROP/i],
    ["/feral-code/promo", /CURRENT CODES/i], ["/feral-code/referral", /BRING THE PACK/i],
    ["/feral-code/discounts", /MORE WORK/i], ["/policies/order-payment", /Cash on Delivery is not available/i],
    ["/login", /NO ACCOUNT/i],
  ];
  for (const [path, expected] of routes) {
    const response = await render(path); assert.equal(response.status, 200, path); assert.match(await response.text(), expected, path);
  }
});

test("keeps required brand assets and removes starter preview", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  await access(new URL("../public/feral-logo.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  assert.match(page, /useState/);
  assert.match(page, /Add .* to bag/);
  assert.match(layout, /FERAL Wear/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
