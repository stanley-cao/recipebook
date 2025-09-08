import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Recipebook",
  description: "Relay + Prisma demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, Arial, sans-serif' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}