import { Hono } from "hono";
import user from "./router/user";
import blog from "./router/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_PASSWORD: string;
  };
}>();
app.use("/*", cors());
app.route("/api/v1/user", user);
app.route("/api/v1/blog", blog);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
