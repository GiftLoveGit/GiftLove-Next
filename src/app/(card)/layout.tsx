import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import BootstrapClient from '@/components/BootstrapClient';
import Sidebar from "@/components/Sidebar";
// import FooterDash from "@/components/FooterDash";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GiftLove | Cartão",
    description: "GiftLove | Cartão",
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
