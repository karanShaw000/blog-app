import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export type SignupType = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinSchema>;
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type PostType = z.infer<typeof postSchema>;
export declare const updatePostSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
