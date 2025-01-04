"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Header from "./header";
import BG from "@/public/home/BG_Home.jpg";

interface HandleStarted {
  (): void;
}

export default function Started() {
  const router = useRouter();

  const handleStarted: HandleStarted = () => {
    router.push("/auth/sign-in");
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

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 space-y-4">
          <p className="font-extrabold text-white md:text-5xl text-2xl">
            <span>Unlimited movies,</span>
            <span className="block">TV shows and more</span>
          </p>
          <p className="text-sm text-white font-bold md:text-lg">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-sm text-white md:text-lg">
            Are you ready? Enter your email to create or restart your
            membership.
          </p>

          <div className="flex flex-col items-center mt-8 w-full px-4">
            <div className="flex flex-col md:flex-row items-center w-full max-w-2xl gap-4">
              <div className="relative flex-none w-3/4 md:h-16">
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  className="peer w-full h-full px-6 pt-6 pb-2 text-sm md:text-lg text-white bg-transparent border border-gray-300 rounded-l-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-0 text-sm md:text-lg text-gray-400 transition-all duration-200 ease-in-out peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-red-600 peer-focus:text-[12px] md:peer-focus:text-sm"
                >
                  Enter Your Email Address
                </label>
              </div>
              <Button
                onClick={handleStarted}
                className="h-8 md:h-16 md:text-lg px-8 text-sm font-bold bg-red-600 text-white rounded-r-md hover:bg-red-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
