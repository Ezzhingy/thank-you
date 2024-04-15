import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

export const dynamic = "force-dynamic";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thank You",
  description: "An ecard creator and viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
