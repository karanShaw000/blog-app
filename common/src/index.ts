import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string(),
  password: z
    .string()
    .min(8, { message: "Must have 8 or more characters long" }),
});

export type SignupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Must have 8 or more characters long" }),
});

export type SigninType = z.infer<typeof signinSchema>;

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type PostType = z.infer<typeof postSchema>;

export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
export type UpdatePostType = z.infer<typeof updatePostSchema>;
