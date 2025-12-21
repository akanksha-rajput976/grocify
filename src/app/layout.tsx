import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "grocify | Your Online Grocery Store",
  description: "your one-stop shop for fresh groceries online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-green-100">
        {children}
      </body>
    </html>
  );
}
