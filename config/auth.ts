import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import dbConnect from "@/utils/db";

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await dbConnect(); // Ensure database connection
          const user = (await User.findOne({
            email: credentials.email,
          }).exec()) as {
            _id: string;
            email: string;
            fullName: string;
            password: string;
          };

          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
};
