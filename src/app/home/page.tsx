import React from "react";

import { getAuthenticatedAppForUser } from "@/firebase/getAuthenticatedAppForUser";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Home: React.FC = async () => {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) {
    redirect("/");
  }

  return <>home</>;
};

export default Home;
