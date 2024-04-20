"use client";

import CreateUpload from "@/components/CreateUpload";
import { useRouter } from "next/navigation";
import React from "react";

const Cover: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <CreateUpload isCover router={router} />
    </div>
  );
};

export default Cover;
