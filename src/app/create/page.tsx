"use client";

import { useUserSession } from "@/components/Header";
import {
  getCreateCardInfo,
  resetCreateCard,
  sendCard,
} from "@/firebase/firestore";
import { Dialog } from "@headlessui/react";
import { Spacer } from "@nextui-org/spacer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Create: React.FC = () => {
  const [cardCover, setCardCover] = useState<string>("");
  const [cardContent, setCardContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useUserSession();
  const router = useRouter();

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
      sendCard(cardCover, cardContent, email, user);
      resetCreateCard(user);
      setIsOpen(true);
    }
  };

  const redirectHome = () => {
    router.push("/home");
  };

  useEffect(() => {
    if (!user) return;
    getCreateCardInfo(user, setCardCover, setCardContent);
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
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute top-1/4 left-1/3 w-[30%] h-[30%] bg-lightBlue border-2 border-brown p-5 flex flex-col justify-center"
      >
        <Dialog.Panel className="flex flex-col gap-5">
          <Dialog.Title className="text-3xl font-bold">Success!</Dialog.Title>
          <Dialog.Description className="text-2xl">
            Your card has been sent to {email}.
          </Dialog.Description>
          <button
            onClick={redirectHome}
            className="text-2xl text-orange font-bold border-2 border-orange p-2 transition-colors hover:bg-orange hover:text-lightBlue"
          >
            GO HOME
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Create;
