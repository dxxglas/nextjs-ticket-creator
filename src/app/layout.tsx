import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zendesk ticket creator",
  description: "Insert informations and create new tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
