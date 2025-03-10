import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import React from "react";
import TanStackProvider from "@/components/provider/TanStack";
import { ToastContainer } from "react-toastify";

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className="bg-[#001E3C] text-white">
          <div className="grow h-full">{children}</div>
          <ToastContainer />
        </body>
      </TanStackProvider>
    </html>
  );
};

export default RootLayout;
