"use client";

import { Spacer } from "@nextui-org/spacer";
import React from "react";

const Create: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[99vh]">
      <div className="flex w-[70%]">
        <div className="flex flex-1 border-2 border-brown p-5 text-3xl">
          Upload card cover
        </div>
        <button className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
          Upload
        </button>
      </div>
      <div className="flex w-[70%]">
        <div className="flex flex-1 border-2 border-brown p-5 text-3xl">
          Upload card content
        </div>
        <button className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
          Upload
        </button>
      </div>
      <Spacer y={48} />
      <div className="w-[70%]">
        <label htmlFor="email" className="text-3xl">
          Send to:
        </label>
        <div className="flex">
          <input
            id="email"
            placeholder="test@gmail.com"
            className="flex flex-1 border-2 border-brown p-5 text-3xl bg-transparent"
          />
          <button className="border-y-2 border-r-2 border-brown p-5 text-3xl font-bold text-orange">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
