"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import User from "@/models/user.model";
import { authSchema } from "@/schemas/auth.schema";

export async function signupAction(data: FormData) {
  try {
    // Convert FormData to a plain object
    const input = Object.fromEntries(data.entries());

    // Validate input using Zod schema
    const validatedData = authSchema.parse(input);

    // Connect to the database
    await connectToDatabase();

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return {
        success: false,
        message: "The email is already registered. Please use another email.",
      };
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12); // 12 salt rounds for better security

    // Create and save the new user
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
      // Format and return all validation errors
      const validationErrors = error.errors.map((err) => err.message).join(", ");
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
