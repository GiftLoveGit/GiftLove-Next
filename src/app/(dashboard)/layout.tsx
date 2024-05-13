import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import BootstrapClient from '@/components/BootstrapClient';
import Sidebar from "@/partials/Sidebar";
import FooterDash from "@/partials/FooterDash";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gift Love | Dashboard",
    description: "Dashboard",
    icons: {
        icon: "@/favicon.svg"
    },
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <div className="blue-rectangle w-100 position-absolute top-0 z-n1"></div>
            <div className="page-content">
                <Sidebar currentPage="Dashboard" />
                {children}
                <FooterDash />
                <BootstrapClient />
            </div>
        </div>
    );
}
