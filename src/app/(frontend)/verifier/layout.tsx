import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import MobileNavbar from "@/components/MobileNavbar";
import VerifierLeftSidebar from "@/components/dashboard/verifier-left-sidebar";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";

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
      <body className="antialiased flex text-blue-50 max-w-[1440px] min-h-screen mx-auto overflow-x-hidden">
        <AuthProvider>
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
              <VerifierLeftSidebar />
              <div className="grow">
                {children}
                <MobileNavbar />
              </div>
            </main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
