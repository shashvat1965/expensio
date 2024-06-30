import { eq } from "drizzle-orm";
import { db } from "../db";
import { SelectTxn, SelectUser, txnTable } from "../schema";

export async function getAllTxnsOfUser(id: SelectUser["id"]) {
	return await db.select().from(txnTable).where(eq(txnTable.txnId, id));
}

export async function updateTxnAfterSplit(
	id: SelectTxn["txnId"],
	newAmount: SelectTxn["amount"],
) {
	await db
		.update(txnTable)
		.set({ amount: newAmount })
		.where(eq(txnTable.txnId, id));
}

export async function deleteTransaction(id: SelectTxn["txnId"]) {
	await db.delete(txnTable).where(eq(txnTable.txnId, id));
}
