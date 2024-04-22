"use client";

import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type TDate = {
  seconds: number;
  nanoseconds: number;
};

type TCard = {
  cover: string;
  content: string;
  date: TDate;
  senderName: string;
  count: number;
};

interface IProps {
  allCards?: DocumentData;
}
const DisplayReadCards: React.FC<IProps> = ({ allCards }) => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  if (!allCards)
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        No cards yet!
      </div>
    );

  allCards.sort((a: TCard, b: TCard) => {
    return b.date.seconds - a.date.seconds;
  });

  return (
    <div className="flex flex-col gap-5 mx-10 md:ml-20 mt-20">
      {allCards.map((card: TCard, index: number) => {
        const date = new Date(card.date.seconds * 1000);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        });
        return (
          <Link
            href={{ pathname: "/view/card", query: { uid, id: card.count } }}
            className="flex md:w-[70%]"
            key={index}
          >
            <div className="flex flex-1 items-center gap-2 border-2 border-brown p-5 text-base md:text-3xl">
              <h1>
                <span className="hidden sm:inline">
                  You&apos;ve received a card from
                </span>{" "}
                {card.senderName}!
              </h1>
            </div>
            <div className="border-y-2 border-r-2 border-brown p-5 text-base md:text-3xl">
              {formattedDate}
            </div>
            <div className="border-y-2 border-r-2 border-brown p-5 text-base md:text-3xl font-bold text-orange">
              View
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayReadCards;
