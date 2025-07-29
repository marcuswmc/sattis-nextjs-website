import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import AppointmentsProviderWrapper from "@/hooks/appointmentsProviderWrapper";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "sonner";
import {
  ConsentManagerProvider,
  CookieBanner,
  ConsentManagerDialog,
} from "@c15t/nextjs";

const bricolageFont = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sattis Studio - Barbearia, Tattoo, Estética e Piercings",
    template: "%s | Sattis Studio",
  },
  description: "Barbearia, Tattoo, Estética e Piercings",
  keywords: [
    "barbearia",
    "barber",
    "tattoo",
    "tatuagem",
    "estética",
    "piercings",
    "barbeiro Porto",
    "tatuador Porto",
    "salão beleza Porto",
  ],
  authors: [{ name: "Sattis Studio" }],
  creator: "Sattis Studio",
  publisher: "Sattis Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <head>
      <link rel="canonical" href="https://sattis.me" />
      </head>
      <body
        className={`${bricolageFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConsentManagerProvider
          options={{
            mode: "c15t",
            backendURL: "/api/c15t",
            consentCategories: ["necessary", "marketing"],
            ignoreGeoLocation: true,
          }}
        >
          <CookieBanner
            theme={{
              "banner.footer.accept-button": {
                className:
                  "bg-primary text-white p-2 rounded-md cursor-pointer",
                noStyle: true,
              },
              "banner.footer.customize-button": {
                className:
                  "border border-black text-sm text-black p-2 rounded-md cursor-pointer",
                noStyle: true,
              },
              "banner.footer.reject-button": {
                className:
                  "border border-black text-sm text-black p-2 rounded-md cursor-pointer",
                noStyle: true,
              },
            }}
            trapFocus={false}
          />
          <ConsentManagerDialog />

          <AppointmentsProviderWrapper>
            <Header />
            {children}
            <Toaster />
            <Analytics />
          </AppointmentsProviderWrapper>
        </ConsentManagerProvider>
      </body>
    </html>
  );
}
