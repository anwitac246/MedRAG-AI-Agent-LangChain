import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../app/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "AetherCare - AI Medical Diagnosis",
  description: "Advanced medical diagnosis powered by AI",
};

// Create a client component wrapper for QueryClientProvider
function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}