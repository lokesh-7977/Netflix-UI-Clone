"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
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
        message: "Email is already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser = new User({
      fullName: validatedData.fullName,
      email: validatedData.email,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
      message: "User registered successfully!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || "Invalid input",
      };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
