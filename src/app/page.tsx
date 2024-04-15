export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-10 min-h-[99vh]">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-7xl">
            THANK <span className="text-orange">YOU</span>
          </h1>
          <h2 className="text-4xl">An ecard creator and viewer</h2>
        </div>
        {/* <button className="font-bold text-4xl border-2 border-brown p-2 transition-colors hover:bg-brown hover:text-lightBlue">
          AUTHENTICATE
        </button> */}
      </div>
    </main>
  );
}
