"use client";

import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import React from "react";

interface IProps {
  allCards?: DocumentData;
}
const DisplayReadCards: React.FC<IProps> = ({ allCards }) => {
  if (!allCards) return null;

  const cards = [];
  for (let i = 0; i < allCards.cover.length; ++i) {
    const date = new Date(allCards.date[i].seconds * 1000);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    cards.push({
      cover: allCards.cover[i],
      content: allCards.content[i],
      date: formattedDate,
      senderName: allCards.senderName[i],
    });
  }

  return (
    <div className="flex flex-col gap-5 ml-20 mt-20">
      {cards.map((card, index) => (
        <Link href={`/view/${index}`} className="flex w-[70%]" key={index}>
          <div className="flex flex-1 items-center gap-2 border-2 border-brown p-5 text-3xl">
            <h1>You&apos;ve received a card from {card.senderName}!</h1>
          </div>
          <div className="border-y-2 border-r-2 border-brown p-5 text-3xl">
            {card.date}
          </div>
          <div className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
            View
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DisplayReadCards;
