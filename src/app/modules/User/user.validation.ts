import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    role: z.string().optional().default("user"),
  }),
});

export const userValidation = {
  userValidationSchema,
};
