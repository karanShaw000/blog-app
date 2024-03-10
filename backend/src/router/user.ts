import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinSchema, signupSchema } from "@karan000/common";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASSWORD: string;
  };
}>();

//password hashing is not done yet

app.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedBody = signupSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        message: parsedBody.error.message,
      },
      401
    );
  }
  const { email, password, name } = parsedBody.data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
      password,
      name,
    },
  });

  if (!userExists) {
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      });

      const token = await sign({ id: user.id }, c.env.JWT_PASSWORD);
      return c.json({
        token,
        username: user.name,
      });
    } catch (error) {
      return c.json(
        {
          message: "something went wrong",
          error,
        },
        500
      );
    }
  } else {
    return c.json(
      {
        message: "User already exists",
      },
      401
    );
  }
});

app.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const parsedBody = signinSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        message: parsedBody.error.message,
      },
      401
    );
  }
  const { email, password } = parsedBody.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    if (user) {
      const token = await sign({ id: user.id }, c.env.JWT_PASSWORD);
      return c.json({
        token,
        username: user.name,
      });
    } else {
      return c.json({ message: "User does not exists" }, 401);
    }
  } catch (error) {
    return c.json({ message: "something went worng" }, 500);
  }
});

export default app;
