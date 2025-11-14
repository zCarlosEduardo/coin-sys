import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavBar from "@/components/NavBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
      
        className={`${montserrat.variable} antialiased`}
      >
              <NavBar />
        {children}
      </body>
    </html>
  );
}
