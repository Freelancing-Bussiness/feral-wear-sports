import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(), passwordSalt: text("password_salt").notNull(), createdAt: integer("created_at").notNull(),
});
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), expiresAt: integer("expires_at").notNull(), createdAt: integer("created_at").notNull(),
});
