export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-10 min-h-[99vh] text-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-7xl">
            THANK <span className="text-orange">YOU</span>
          </h1>
          <h2 className="text-3xl">
            <span className="hidden sm:block">
              Sending much gratitude and appreciation,
            </span>
            <span className="hidden sm:inline">f</span>
            <span className="sm:hidden">F</span>rom me to you
          </h2>
        </div>
        {/* <button className="font-bold text-4xl border-2 border-brown p-2 transition-colors hover:bg-brown hover:text-lightBlue">
          AUTHENTICATE
        </button> */}
      </div>
    </main>
  );
}
