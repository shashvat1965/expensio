import { z } from "zod";

export const UserSignupValidation = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const UserLoginValidation = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
