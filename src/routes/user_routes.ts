import { Hono } from "hono";
import {
	loginController,
	profileController,
	signupController,
} from "../controllers/user_controllers";
import { authMiddleware } from "../middleware/auth";

export const userRouter = new Hono();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.get("/profile", authMiddleware, profileController);
