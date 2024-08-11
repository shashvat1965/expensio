import { cors } from "hono/cors";
import { userRouter } from "./routes/user_routes";
import { txnRouter } from "./routes/txn_routes";
import { Hono } from "hono";

const app = new Hono();

app.use(cors());
app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/txn", txnRouter);

export { app };
