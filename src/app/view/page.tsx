import DisplayReadCards from "@/components/DisplayReadCards";
import { getReadCards } from "@/firebase/firestore";
import React from "react";

export const dynamic = "force-dynamic";

const View = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const allCards = await getReadCards(searchParams.uid as string);

  return (
    <div>
      <DisplayReadCards allCards={allCards?.cards} />
    </div>
  );
};

export default View;
