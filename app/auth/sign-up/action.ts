"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import connectToDatabase from "@/utils/db";
import User from "@/models/user.model";
import { authSchema } from "@/schemas/auth.schema";

export async function signupAction(data: FormData) {
  try {
    const input = Object.fromEntries(data.entries());

    const validatedData = authSchema.parse(input);

    await connectToDatabase();

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return {
        success: false,
        message: "The email is already registered. Please use another email.",
      };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const newUser = new User({
      fullName: validatedData.fullName,
      email: validatedData.email,
      password: hashedPassword,
    });
    await newUser.save();

    return {
      success: true,
      message: "User registered successfully! Please log in.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors
        .map((err) => err.message)
        .join(", ");
      return {
        success: false,
        message: `Validation Error(s): ${validationErrors}`,
      };
    }

    console.error("Signup Error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      console: error,
    };
  }
}
