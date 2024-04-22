"use client";

import { uploadCard } from "@/firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useUserSession } from "@/components/Header";
import { getCreateCardId, saveCreateCard } from "@/firebase/firestore";
import { CheckDeviceSize } from "@/lib/CheckDeviceSize";

interface IProps {
  isCover: boolean;
  router: AppRouterInstance;
}
const CreateUpload: React.FC<IProps> = ({ isCover, router }) => {
  const [filePreview, setFilePreview] = useState<string>();
  const [file, setFile] = useState<File>();
  const user = useUserSession();

  const isMobile = CheckDeviceSize(640);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (!image) return;
    setFilePreview(URL.createObjectURL(image));
    setFile(image);
  };

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !file) return;

    try {
      const count = await getCreateCardId(user);
      const cardURL = await uploadCard(
        `cards/${user.uid}/${count}/${isCover ? "cover" : "content"}`,
        file
      );
      await saveCreateCard(isCover, user, cardURL!);
      router.push("/create");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[99vh]">
      <h1 className="font-bold text-2xl sm:text-3xl">
        {isCover ? "UPLOAD CARD COVER" : "UPLOAD CARD CONTENT"}
      </h1>
      {filePreview ? (
        <Image
          src={filePreview}
          alt="file preview"
          width={isMobile ? 250 : 400}
          height={isMobile ? 250 : 400}
        />
      ) : null}
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          required
          accept="image/*"
          className="w-40 sm:w-60"
        />
        <button className="text-2xl text-orange font-bold border-2 border-orange p-2 transition-colors hover:bg-orange hover:text-lightBlue">
          DONE
        </button>
      </form>
    </div>
  );
};

export default CreateUpload;
