import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/providers/ReduxProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserrat = Montserrat({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL || "https://replypilot.apponislam.top"),
    title: "ReplyPilot AI",
    description: "AI-Powered Customer Reply Automation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
            <body className={`${montserrat.className} min-h-full flex flex-col`}>
                <ReduxProviders>
                    <TooltipProvider>{children}</TooltipProvider>
                </ReduxProviders>
            </body>
        </html>
    );
}
