import { Context } from "hono";
import { addTransaction, deleteTransaction, getAllTxnsOfUser, updateTxn } from "../db/queries/transactions";
import { InsertTxn, SelectTxn } from "../db/schema";

export async function txnHistoryController(c: Context) {

  const userId = c.get("userId").id;

  let txnHistory = []

  try {
    txnHistory = await getAllTxnsOfUser(userId);
  } catch (error) {
    return c.json({ message: "Some error took place" }, 500);
  }

  return c.json({ history: txnHistory }, 200);
}

export async function addTxnController(c: Context) {
  const id = c.get("userId").id;
  const body = await c.req.json();

  const txn: InsertTxn = { userId: id, amount: body.amount, }

  try {
    const result = await addTransaction(txn)
    return c.json({ message: "Transaction added successfully", result: result, success: true }, 200);
  } catch (error) {
    return c.json({ message: "Some error took place", error: error }, 500);
  }

}

export async function deleteTxnController(c: Context) {
  const body = await c.req.json();

  const txnId: SelectTxn["txnId"] = body.txnId;

  try {
    await deleteTransaction(txnId);
    return c.json({ message: "Transaction deleted successfully", success: true }, 200);
  } catch (error) {
    return c.json({ message: "Some error took place", error: error }, 500);
  }
}

export async function updateTxnController(c: Context) {
  const body = await c.req.json();

  const txnId: SelectTxn["txnId"] = body.txnId;
  const newAmount: SelectTxn["amount"] = body.amount;

  try {
    await updateTxn(txnId, newAmount);
    return c.json({ message: "Transaction updated successfully", success: true }, 200);
  } catch (error) {
    return c.json({ message: "Some error took place", error: error }, 500);
  }
}
