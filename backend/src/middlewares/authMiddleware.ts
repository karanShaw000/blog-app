import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const authMiddleware = createMiddleware(async (c, next) => {
  const authorization = c.req.header("authorization");

  if (!authorization) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = authorization.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_PASSWORD);
    // console.log(payload);
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    return c.json({ message: "token is not valid", error }, 401);
  }
});

export default authMiddleware;

// <{
//   Bindings: {
//     JWT_PASSWORD: string;
//   };
// }>
