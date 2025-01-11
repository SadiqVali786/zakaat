import type { Metadata } from "next";
import "@/app/globals.css";
import MobileNavbar from "@/components/MobileNavbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GuestLeftSidebar from "@/components/dashboard/guest-left-sidebar";

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
      <body className="antialiased max-w-[1440px] text-blue-50 min-h-screen overflow-x-hidden mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main
            className="flex w-full mx-auto"
            style={{
              paddingLeft: "clamp(1rem, 4.9vw, 5rem)",
              paddingRight: "clamp(1rem, 4.9vw, 5rem)",
            }}
          >
            <GuestLeftSidebar />
            <div className="flex-grow w-full">
              {children}
              <MobileNavbar />
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
