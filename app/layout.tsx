import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            <li>
              <Link href="/">
                home
              </Link>
            </li>
            <li>
              <Link href="/tours">
                tours
              </Link>
            </li>
            <li>
              <Link href="/create">
                create
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
