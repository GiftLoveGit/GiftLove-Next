import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "GiftLove | Seja Parceiro",
    description: "GiftLove | Seja Parceiro",
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
