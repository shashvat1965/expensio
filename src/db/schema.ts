import {
	boolean,
	decimal,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { constants } from "../constants";

export const userTable = pgTable("user_table", {
	id: serial("id").primaryKey(),
	passwordHash: text("password_hash").notNull(),
	email: text("email").notNull(),
	total_spend: decimal("total_spend").default("0").notNull(),
	img_url: text("img_url").default(constants.defaultImageUrl).notNull(),
});

export const txnTable = pgTable("txn_table", {
	amount: numeric("amount").notNull(),
	userId: serial("user_id")
		.notNull()
		.references(() => userTable.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	txnId: serial("txn_id").primaryKey(),
	split_check: boolean("split_check").default(false).notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertTxn = typeof txnTable.$inferInsert;
export type SelectTxn = typeof txnTable.$inferSelect;
