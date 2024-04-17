import React from "react";

import { getAuthenticatedAppForUser } from "@/firebase/getAuthenticatedAppForUser";
import { redirect } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Home: React.FC = async () => {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center gap-8 min-h-[99vh]">
      <button className="w-[30vw] h-[30vw] border-2 border-brown p-20 flex flex-col justify-center items-center transition-colors">
        <Image
          src="/account-wrench.svg"
          width={255}
          height={255}
          alt="account-card"
        />
        <h1 className="text-6xl">CREATE</h1>
      </button>
      <button className="w-[30vw] h-[30vw] border-2 border-orange p-20 flex flex-col justify-center items-center">
        <Image
          src="/account-card.svg"
          width={255}
          height={255}
          alt="account-card"
        />
        <h1 className="text-6xl text-orange">VIEW</h1>
      </button>
    </div>
  );
};

export default Home;
