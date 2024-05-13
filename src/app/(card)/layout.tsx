import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import BootstrapClient from '@/components/BootstrapClient';
import Sidebar from "@/partials/Sidebar";
import FooterDash from "@/partials/FooterDash";
import Navbar from "@/partials/Navbar";
import Footer from "@/partials/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gift Love | Dashboard",
    description: "Dashboard",
    icons: {
        icon: "@/favicon.svg"
    },
};

export default function CardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
