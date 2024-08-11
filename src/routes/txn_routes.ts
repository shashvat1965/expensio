import { Hono } from "hono";
import {
  addTxnController,
  deleteTxnController,
  txnHistoryController,
  updateTxnController,
} from "../controllers/txn_controllers";
import { authMiddleware } from "../middleware/auth"

export const txnRouter = new Hono();

txnRouter.get("/txn_history", authMiddleware, txnHistoryController);
txnRouter.post("/add_txn", authMiddleware, addTxnController);
txnRouter.delete("/delete_txn", authMiddleware, deleteTxnController);
txnRouter.put("/update_txn", authMiddleware, updateTxnController);
