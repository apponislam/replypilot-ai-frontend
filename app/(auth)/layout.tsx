import React from "react";
import AuthRedirectProvider from "@/providers/AuthRedirectProvider";
import AuthSidebar from "@/components/auth/AuthSidebar";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthRedirectProvider>
            <div className="flex min-h-screen w-full bg-white dark:bg-zinc-950 text-foreground">
                {/* Left 50% Panel (Desktop) */}
                <AuthSidebar />

                {/* Right 50% Panel */}
                <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 sm:p-12 md:p-16 lg:p-20 overflow-y-auto">
                    {/* Top Brand Header for Mobile & Tablet */}
                    <div className="flex items-center justify-between w-full mb-8 lg:mb-4">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-ocean text-white shadow-xs shadow-ocean/25 group-hover:bg-ocean-dark transition-colors">
                                <MessageSquareText className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">ReplyPilot</span>
                        </Link>

                        <div className="text-xs text-muted-foreground hidden sm:block">
                            Need help?{" "}
                            <a href="mailto:replypilotai@apponislam.top" className="font-medium text-ocean hover:text-ocean-dark dark:text-mint hover:underline">
                                Contact Support
                            </a>
                        </div>
                    </div>

                    {/* Centered Form */}
                    <div className="flex-1 flex items-center justify-center py-6">
                        <div className="w-full max-w-105">{children}</div>
                    </div>

                    {/* Clean Footer */}
                    <div className="text-center text-xs text-muted-foreground pt-6 border-t border-border/40">
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-foreground">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-foreground">
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </AuthRedirectProvider>
    );
}
