"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema } from "@/schemas/auth.schema";
import Header from "@/components/custom/header";
import BG from "@/public/home/BG_Home.jpg";
export default function SignIn() {
  const [signIn, setSignIn] = useState<string>("Sign In");
  const [errorMsg, setErrorMsg] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = authSchema.safeParse(formData);

    if (!result.success) {
      const errors: { fullName?: string; email?: string; password?: string } =
        {};

      result.error.errors.forEach((err) => {
        if (err.path[0] === "fullName") {
          errors.fullName = err.message;
        } else if (err.path[0] === "email") {
          errors.email = err.message;
        } else if (err.path[0] === "password") {
          errors.password = err.message;
        }
      });

      setErrorMsg(errors);
      return;
    }

    setErrorMsg({ fullName: "", email: "", password: "" });
  };

  return (
    <>
      <Header />
      <div className="relative h-screen">
        <Image
          className="absolute object-cover w-full h-full"
          src={BG}
          alt="Background"
          fill
          priority
        />

        <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-8 w-[450px] bg-black bg-opacity-50 rounded-md text-center">
            <h1 className="text-white self-center text-4xl font-bold">
              {signIn}
            </h1>
            <form className="space-y-6 w-3/4 pt-5">
              {signIn !== "Sign In" && (
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={formData.fullName}
                  className="peer px-6 py-4 h-12 w-[282px] text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              )}
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
                className="peer h-12 w-[282px] px-6 py-4 text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className="peer h-12 w-[282px] py-4 text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
              <Button
                onClick={handleSignIn}
                className="w-full h-12 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-md"
              >
                {signIn}{" "}
              </Button>
            </form>
            {errorMsg && (
              <div className="text-red-500 pt-2">
                {signIn !== "Sign In" && <p>{errorMsg.fullName}</p>}
                {errorMsg.email && <p>{errorMsg.email}</p>}
                {errorMsg.password && <p>{errorMsg.password}</p>}
              </div>
            )}

            {signIn !== "Sign In" ? (
              <p className="text-gray-500 pt-5">
                Already have an account?{" "}
                <span
                  className="text-white font-bold cursor-pointer"
                  onClick={() => setSignIn("Sign In")}
                >
                  Sign In now.
                </span>
              </p>
            ) : (
              <p className="text-gray-500 pt-5">
                Don&apos;t have an account?{" "}
                <span
                  className="text-white font-bold cursor-pointer"
                  onClick={() => setSignIn("Sign Up")}
                >
                  Sign Up now.
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
