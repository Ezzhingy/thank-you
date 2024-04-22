"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserSession } from "@/components/Header";

const Home: React.FC = () => {
  const user = useUserSession();
  if (!user) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 min-h-[99vh]">
      <Link
        href="/create"
        className="w-[80vw] sm:w-[30vw] sm:h-[50vh] border-2 border-brown p-20 flex flex-col justify-center items-center transition-colors"
      >
        <Image
          src="/account-wrench.svg"
          alt="account-card"
          width={255}
          height={255}
          className="hidden sm:block"
        />
        <h1 className="text-6xl">CREATE</h1>
      </Link>
      <Link
        href={{ pathname: "/view", query: { uid: user.uid } }}
        className="w-[80vw] sm:w-[30vw] sm:h-[50vh] border-2 border-orange p-20 flex flex-col justify-center items-center"
      >
        <Image
          src="/account-card.svg"
          alt="account-card"
          width={255}
          height={255}
          className="hidden sm:block"
        />
        <h1 className="text-6xl text-orange">VIEW</h1>
      </Link>
    </div>
  );
};

export default Home;
