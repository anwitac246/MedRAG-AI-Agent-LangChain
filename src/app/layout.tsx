import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/providers";

export const metadata: Metadata = {
  title: "AetherCare - AI Medical Diagnosis",
  description: "Advanced medical diagnosis powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}