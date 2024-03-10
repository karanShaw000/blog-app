"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.postSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    name: zod_1.z.string(),
    password: zod_1.z
        .string()
        .min(8, { message: "Must have 8 or more characters long" }),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Must have 8 or more characters long" }),
});
exports.postSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatePostSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
