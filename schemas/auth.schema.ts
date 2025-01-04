import { z } from "zod";

export const authSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Full Name must only contain letters and spaces",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .refine((data: string) => !data.includes("password"), {
      message: "Password should not contain the word 'password'",
    }),
});
