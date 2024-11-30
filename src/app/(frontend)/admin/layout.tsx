import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";

import "@/app/globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import RightSidebar from "@/components/dashboard/RightSidebar";
import LeftSidebar from "@/components/dashboard/LeftSidebar";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zakaat",
  description:
    "Zakaat distribution web app for deserving, verified poor individuals in your locality and among relatives who can't directly ask for help due to dignity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(
          dm_sans.className,
          "antialiased sadiq-container min-h-screen mx-auto flex relative text-blue-50 px-20"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LeftSidebar />
          <div className="grow">{children}</div>
          <RightSidebar />
        </ThemeProvider>
      </body>
    </html>
  );
}
