import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getAuthenticatedAppForUser } from "@/firebase/getAuthenticatedAppForUser";
import Header from "@/components/Header";
import { User } from "firebase/auth";

export const dynamic = "force-dynamic";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thank You",
  description: "Sending much gratitude and appreciation, from me to you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="en">
      <body>
        <Header initialUser={currentUser?.toJSON() as User} />
        <main className={dmSans.className}>{children}</main>
      </body>
    </html>
  );
}
