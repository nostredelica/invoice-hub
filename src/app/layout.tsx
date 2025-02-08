"use client";

import { Box, CircularProgress } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Open_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/invoices/layout/Sidebar";
import AppNavbar from "./components/invoices/navbar/AppNavbar";
import "./globals.css";
import AppTheme from "./utils/AppThemes";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${openSans.variable}`}>
        <AppRouterCacheProvider>
          <AppTheme>
            <Box sx={{ display: "flex" }}>
              {/* Sidebar (Drawer) */}
              <Sidebar open={open} setOpen={setOpen} />

              {/* Main Content */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <AppNavbar setOpen={setOpen} />
                <Box>
                  {isLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                      }}
                    >
                      <CircularProgress size={50} />
                    </Box>
                  ) : (
                    children
                  )}
                </Box>
              </Box>
            </Box>
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
