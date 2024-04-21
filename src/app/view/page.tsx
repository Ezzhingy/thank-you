import DisplayReadCards from "@/components/DisplayReadCards";
import { getReadCards } from "@/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/firebase/getAuthenticatedAppForUser";
import { User } from "firebase/auth";
import React from "react";

export const dynamic = "force-dynamic";

const View: React.FC = async () => {
  const { currentUser } = await getAuthenticatedAppForUser();
  const allCards = await getReadCards(currentUser?.toJSON() as User);

  return (
    <div>
      <DisplayReadCards allCards={allCards} />
    </div>
  );
};

export default View;
