"use client";

import CreateUpload from "@/components/CreateUpload";
import { useRouter } from "next/navigation";
import React from "react";

const Content: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <CreateUpload isCover={false} router={router} />
    </div>
  );
};

export default Content;
