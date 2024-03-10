import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import authMiddleware from "../middlewares/authMiddleware";
import { postSchema, updatePostSchema } from "@karan000/common";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASSWORD: string;
  };
  Variables: {
    userId: string;
  };
}>();

//create a blog post when user is signed in
app.post("/", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedBody = postSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        message: parsedBody.error.message,
      },
      401
    );
  }
  const { content, title } = parsedBody.data;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    return c.json(
      {
        message: "Blog created successfully",
        post,
      },
      200
    );
  } catch (error) {
    return c.json({
      message: "something went wronng during creation of post",
      error,
    });
  }
});

// update the blog post with an id
app.put("/:id", authMiddleware, async (c) => {
  // const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedBody = updatePostSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json(
      {
        message: parsedBody.error.message,
      },
      401
    );
  }
  const { content, title } = parsedBody.data;
  const postId = c.req.param("id");
  try {
    const post = await prisma.post.update({
      data: {
        title,
        content,
      },
      where: {
        id: postId,
      },
    });

    return c.json(
      {
        message: "Blog updated successfully",
        post,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "something went wronng during updation of post",
        error,
      },
      500
    );
  }
});

// get the blog which has blogId = id
app.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(
      {
        post,
      },
      200
    );
  } catch (error) {
    return c.json({
      message: "Something went wrong while getting the post",
      error,
    });
  }
});

//get all the list of blog posts
app.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const postList = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
    });
    return c.json(
      {
        postList,
      },
      200
    );
  } catch (error) {
    return c.json({
      message: "Something went worng",
      error,
    });
  }
});

export default app;
