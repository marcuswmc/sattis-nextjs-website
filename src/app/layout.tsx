import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import AppointmentsProviderWrapper from "@/hooks/appointmentsProviderWrapper";

import { Toaster } from "sonner";

const bricolageFont = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sattis Studio",
  description: "Barbearia, Tattoo, Estética e Piercings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageFont.variable} antialiased`}>
        <AppointmentsProviderWrapper>
          <Header />
          {children}
          <Toaster />
        </AppointmentsProviderWrapper>
      </body>
    </html>
  );
}
