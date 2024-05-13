import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar  from "@/partials/Navbar";
// import Footer  from "@/partials/Footer";
import BootstrapClient from '@/components/BootstrapClient';
import Favicon from "./favicon.svg";

const inter = Inter({ subsets: ["latin"] });
{/* <link rel="icon" href="%PUBLIC_URL%/favicon.svg" /> */}
export const metadata: Metadata = {
  title: "Gift Love",
  description: "Gift Cards",
  icons: {
    icon: "./favicon.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <link rel="icon" href="./favicon.svg" sizes="any" /> */}

          {/* <Navbar /> */}
            {children}
          {/* <Footer /> */}
        <BootstrapClient /> 
        </body>
    </html>
  );
}
