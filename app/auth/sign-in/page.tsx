"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Signin } from "./action";
import BG from "@/public/home/BG_Home.jpg";

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }
  
    try {
      const response = await Signin(formData);
      if (!response || response.error) {
        toast.error(response?.error || "Invalid credentials");
        return;
      }
  
      toast.success("Sign-in successful!");
      router.push("/browse");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  

  return (
    <>
      <div className="relative h-screen">
        <Image
          src={BG}
          alt="Background"
          fill
          priority
          className="absolute object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-8 w-[450px] bg-black bg-opacity-50 rounded-md text-center">
            <h1 className="text-white text-4xl font-bold">Sign In</h1>
            <form
              className="space-y-6 w-3/4 pt-5"
              onSubmit={handleSignIn}
              noValidate
            >
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
                className="peer h-12 w-[282px] px-6 py-4 text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                required
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className="peer h-12 w-[282px] py-4 text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                required
              />
              <Button
                type="submit"
                className="w-full h-12 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-md"
              >
                Sign In
              </Button>
            </form>
            <p className="text-gray-500 pt-5">
              Don&apos;t have an account?{" "}
              <span
                className="text-white font-bold cursor-pointer"
                onClick={() => router.push("/auth/sign-up")}
              >
                Sign Up now.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
