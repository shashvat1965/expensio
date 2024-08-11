import { Context } from "hono";
import { verify } from "hono/utils/jwt/jwt";
import { env } from "hono/adapter";
import { SignatureKey } from "hono/utils/jwt/jws";

export async function authMiddleware(c: Context, next: () => Promise<void>) {
  if (c.req.header("Authorization")) {
    const token = c.req.header("Authorization")!.split(" ")[1];
    const decode = await verify(
      token,
      env<{ JWT_SECRET: SignatureKey }>(c).JWT_SECRET,
    );
    if (decode) {
      c.set("userId", decode);
      await next();
    } else {
      return c.json({ message: "Invalid token" }, 401);
    }
  } else {
    return c.json({ message: "Token not provided" }, 401);
  }
}
