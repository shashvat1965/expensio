import { Context } from "hono";
import { createUser, getUserFromId, verifyPassword, getUserFromEmail } from "../db/queries/user";
import { UserLoginValidation, UserSignupValidation } from "../zod/user_validation";
import { sign } from "hono/utils/jwt/jwt";

export async function signupController(c: Context) {
  // user signup
  const body = await c.req.json();

  // body validation
  const result = UserSignupValidation.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
        message: "Bad request",
      },
      400,
    );
  }

  try {
    const result = await createUser(body);
    return c.json(
      {
        success: true,
        data: result,
        message: "User created successfully",
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error,
        message: "Some error took place",
      },
      500,
    );
  }
}

export async function loginController(c: Context) {
  // login logic
  const body = await c.req.json();

  // body validation
  const result = UserLoginValidation.safeParse(body);
  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
        message: "Bad request",
      },
      400,
    );
  }

  try {
    const isPasswordValid = await verifyPassword(body);
    if (!isPasswordValid) {
      return c.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        401,
      );
    }

    const user = await getUserFromEmail(body.email);
    if (!user) {
      return c.json(
        {
          success: false,
          message: "User not found",
        },
        404,
      );
    }

    if (!process.env.JWT_SECRET) {
      return c.json({
        success: false,
        error: "JWT secret not found",
        message: "Some error took place",
      })
    }

    const token = await sign({ id: user[0].id }, process.env.JWT_SECRET);
    return c.json(
      {
        success: true,
        data: { token: token, user: user[0] },
        message: "Login successful",
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error,
        message: "Some error took place",
      },
      500,
    );
  }
}

export async function profileController(c: Context) {
  const id = c.get("userId").id;
  const user = await getUserFromId(id);
  if (!user) {
    return c.json(
      {
        success: false,
        message: "User not found",
      },
      404,
    );
  }
  return c.json(
    {
      success: true,
      data: user[0],
      message: "User found",
    },
    200,
  );
}
