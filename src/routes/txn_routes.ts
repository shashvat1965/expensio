import { Hono } from "hono";
import {
	addTxnController,
	deleteTxnController,
	txnHistoryController,
	updateTxnController,
} from "../controllers/txn_controllers";

export const txnRouter = new Hono();

txnRouter.get("/txn_history", txnHistoryController);
txnRouter.post("/add_txn", addTxnController);
txnRouter.delete("/delete_txn", deleteTxnController);
txnRouter.put("/update_txn", updateTxnController);
