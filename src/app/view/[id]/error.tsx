"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[99vh] flex flex-col justify-center items-center gap-2">
      <h2 className="text-4xl font-bold text-center">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="text-2xl text-orange font-bold border-2 border-orange p-2 transition-colors hover:bg-orange hover:text-lightBlue"
      >
        Try again
      </button>
    </div>
  );
}
