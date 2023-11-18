import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/Providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "Discord clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313333]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            storageKey="discord-clone"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
