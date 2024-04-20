"use client";

import { useUserSession } from "@/components/Header";
import { getCardInfo } from "@/firebase/firestore";
import { Spacer } from "@nextui-org/spacer";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Create: React.FC = () => {
  const [cardCover, setCardCover] = useState<boolean>(false);
  const [cardContent, setCardContent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();

  const user = useUserSession();

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateAndSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cardCover) {
      alert("Please upload card cover");
    } else if (!cardContent) {
      alert("Please upload card content");
    } else if (!email) {
      alert("Please enter email");
    } else {
      alert("Sending...");
    }
  };

  useEffect(() => {
    if (!user) return;
    getCardInfo(user, setCardCover, setCardContent);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[99vh]">
      <Link href="/create/cover" className="flex w-[70%]">
        <div className="flex flex-1 items-center gap-2 border-2 border-brown p-5 text-3xl">
          <h1>Upload card cover</h1>
          {cardCover ? (
            <Image
              src="/check-bold.svg"
              alt="check-bold"
              width={35}
              height={35}
            />
          ) : null}
        </div>
        <div className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
          Upload
        </div>
      </Link>
      <Link href="/create/content" className="flex w-[70%]">
        <div className="flex flex-1 items-center gap-2 border-2 border-brown p-5 text-3xl">
          <h1>Upload card content</h1>
          {cardContent ? (
            <Image
              src="/check-bold.svg"
              alt="check-bold"
              width={35}
              height={35}
            />
          ) : null}
        </div>
        <div className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
          Upload
        </div>
      </Link>
      <Spacer y={48} />
      <div className="w-[70%]">
        <form onSubmit={validateAndSend}>
          <label htmlFor="email" className="text-3xl">
            Send to:
          </label>
          <div className="flex">
            <input
              id="email"
              placeholder="test@gmail.com"
              type="email"
              onChange={updateEmail}
              className="flex flex-1 border-2 border-brown p-5 text-3xl bg-transparent"
            />
            <button className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
