"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "@/public/home/Netflix_Logo.png";
export default function Header() {
  const [sign] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="absolute top-0 z-50 w-full flex items-center justify-between gap-4 px-4 md:px-24 py-3 bg-gradient-to-b from-black">
        <Image
          src={Logo}
          alt="Logo"
          width={160}
          height={80}
          onClick={() => router.push("/")}
        />
        {!sign ? (
          <Button
            onClick={() => router.push("/auth/sign-in")}
            className="z-50 h-10 px-8 text-lg font-bold bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign In
          </Button>
        ) : (
          pathname !== "/" && pathname !== "/auth/sign-in" && (
            <Button
              onClick={() => router.push("/auth/sign-out")}
              className="z-50 h-10 px-8 text-lg font-bold bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </Button>
          )
        )}
      </div>
    </>
  );
}
