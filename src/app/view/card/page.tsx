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

  useEffect(() => {
    const fetchCard = async () => {
      const card = await getReadCardById(uid!, Number(id!));
      setCover(card.cover);
      setContent(card.content);
    };

    fetchCard();
  }, [id, uid]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[99vh]">
      <div className="flex">
        {cover ? (
          <Image
            src={cover}
            alt="cover"
            width={400}
            height={400}
            className=""
          />
        ) : null}
        {content ? (
          <Image
            src={content}
            alt="content"
            width={400}
            height={400}
            className="-translate-x-40"
          />
        ) : null}
      </div>
      <button className="text-2xl text-orange font-bold border-2 border-orange p-2 transition-colors hover:bg-orange hover:text-lightBlue">
        DONE
      </button>
    </div>
  );
};

export default ReadCard;
