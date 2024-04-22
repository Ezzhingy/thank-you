"use client";

import { getReadCardById } from "@/firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReadCard: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const id = searchParams.get("id");

  const [cover, setCover] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isCoverFront, setIsCoverFront] = useState<boolean>(true);

  useEffect(() => {
    const fetchCard = async () => {
      const card = await getReadCardById(uid!, Number(id!));
      setCover(card.cover);
      setContent(card.content);
    };

    fetchCard();
  }, [id, uid]);

  const toggleCoverFront = () => {
    if (!isCoverFront) {
      setIsCoverFront(true);
    }
  };

  const toggleCoverBack = () => {
    if (isCoverFront) {
      setIsCoverFront(false);
    }
  };

  return (
    <div className="flex items-end justify-center min-h-[96vh]">
      <div>
        {cover ? (
          <Image
            src={cover}
            alt="cover"
            width={400}
            height={400}
            onClick={toggleCoverFront}
            className={`${
              isCoverFront
                ? "z-10 scale-110 translate-x-14"
                : "z-1 scale-100 -translate-x-14 transition-transform transform-gpu ease-in-out hover:scale-105 hover:cursor-pointer"
            } absolute top-[10%] left-[25%]`}
          />
        ) : null}

        {content ? (
          <Image
            src={content}
            alt="content"
            width={400}
            height={400}
            onClick={toggleCoverBack}
            className={`${
              !isCoverFront
                ? "z-10 scale-110 -translate-x-14"
                : "z-1 scale-100 translate-x-14 transition-transform transform-gpu ease-in-out hover:scale-105 hover:cursor-pointer"
            } absolute top-[10%] left-[40%]`}
          />
        ) : null}
      </div>
      <div className="flex">
        <Image
          src="/chevron-left.svg"
          alt="chevron-left"
          width={50}
          height={50}
          onClick={toggleCoverFront}
          className={`${
            isCoverFront
              ? "cursor-default opacity-50"
              : "cursor-pointer opacity-100"
          }`}
        />
        <Image
          src="/chevron-right.svg"
          alt="chevron-right"
          width={50}
          height={50}
          onClick={toggleCoverBack}
          className={`${
            !isCoverFront
              ? "cursor-default opacity-50"
              : "cursor-pointer opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default ReadCard;
