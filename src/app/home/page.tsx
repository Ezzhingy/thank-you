"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-8 min-h-[99vh]">
      <Link
        href="/create"
        className="w-[30vw] h-[30vw] border-2 border-brown p-20 flex flex-col justify-center items-center transition-colors"
      >
        <Image
          src="/account-wrench.svg"
          alt="account-card"
          width={255}
          height={255}
        />
        <h1 className="text-6xl">CREATE</h1>
      </Link>
      <Link
        href="/view"
        className="w-[30vw] h-[30vw] border-2 border-orange p-20 flex flex-col justify-center items-center"
      >
        <Image
          src="/account-card.svg"
          alt="account-card"
          width={255}
          height={255}
        />
        <h1 className="text-6xl text-orange">VIEW</h1>
      </Link>
    </div>
  );
};

export default Home;
