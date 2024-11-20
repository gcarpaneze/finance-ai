import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Finance AI",
};

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className={`${mulish.className} dark antialiased`}>
          <div className="flex h-full flex-col overflow-hidden">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
