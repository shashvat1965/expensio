import {
  boolean,
  decimal,
  foreignKey,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { constants } from "../constants";

export const userTable = pgTable("user_table", {
  id: uuid('id').primaryKey().defaultRandom(),
  passwordHash: text("password_hash").notNull(),
  email: text("email").notNull(),
  total_spend: decimal("total_spend").default("0").notNull(),
  img_url: text("img_url").default(constants.defaultImageUrl).notNull(),
});

export const txnTable = pgTable("txn_table", {
  amount: numeric("amount").notNull(),
  userId: uuid("user_id")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  txnId: serial("txn_id").primaryKey(),
}, (table) => {
  return {
    fk: foreignKey({
      columns: [table.userId],
      foreignColumns: [userTable.id]
    })
  };
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertTxn = typeof txnTable.$inferInsert;
export type SelectTxn = typeof txnTable.$inferSelect;
