import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { AppointmentsProvider } from "@/hooks/appointments-context";
import { Suspense } from "react";

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
          <AppointmentsProvider>
            <Header />
            <Suspense fallback={null}>{children}</Suspense>
          </AppointmentsProvider>
      </body>
    </html>
  );
}
