"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquareText, Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useMounted } from "@/hooks/use-mounted";
import { getUserAvatarUrl } from "@/lib/utils";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMounted = useMounted();
    const user = useAppSelector(currentUser);

    const userDisplayName = user?.name || "User";
    const userInitials = (userDisplayName || "U")
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    const avatarUrl = getUserAvatarUrl(user?.profileImage);
    const dashboardLink = user?.role === "USER" ? "/dashboard/replies" : "/dashboard";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-ocean text-white flex items-center justify-center shadow-xs shadow-ocean/25 group-hover:bg-ocean-dark transition-colors">
                        <MessageSquareText className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground">ReplyPilot</span>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-foreground transition-colors">
                        How it Works
                    </a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">
                        Pricing
                    </a>
                    <a href="#faq" className="hover:text-foreground transition-colors">
                        FAQ
                    </a>
                </nav>

                {/* Desktop CTA Buttons / User Profile */}
                <div className="hidden md:flex items-center gap-3">
                    {isMounted && user ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href={dashboardLink}
                                className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-muted/70 border border-border/60 transition-colors group"
                            >
                                <div className="size-8 rounded-full overflow-hidden bg-ocean text-white font-bold text-xs flex items-center justify-center shrink-0 border border-border/40 shadow-xs">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={userDisplayName}
                                            className="size-full object-cover"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <span>{userInitials}</span>
                                    )}
                                </div>
                                <div className="flex flex-col text-left leading-tight">
                                    <span className="text-xs font-semibold text-foreground group-hover:text-ocean transition-colors truncate max-w-[120px]">
                                        {userDisplayName}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                                        {user.role}
                                    </span>
                                </div>
                            </Link>

                            <Link href={dashboardLink}>
                                <Button className="h-9 px-3.5 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-xs shadow-xs shadow-ocean/25 transition-all gap-1.5">
                                    <LayoutDashboard className="size-3.5" />
                                    <span>Workspace</span>
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-foreground/80 hover:text-foreground px-3.5 py-2 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/register">
                                <Button className="h-10 px-4 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all">
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu trigger */}
                <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground" aria-label="Toggle menu">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-4">
                    <nav className="flex flex-col space-y-3 text-sm font-medium">
                        <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground py-1">
                            Features
                        </a>
                        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground py-1">
                            How it Works
                        </a>
                        <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground py-1">
                            Pricing
                        </a>
                        <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground py-1">
                            FAQ
                        </a>
                    </nav>
                    <div className="pt-3 border-t border-border flex flex-col gap-2.5">
                        {isMounted && user ? (
                            <>
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/60">
                                    <div className="size-10 rounded-full overflow-hidden bg-ocean text-white font-bold text-xs flex items-center justify-center shrink-0">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={userDisplayName}
                                                className="size-full object-cover"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <span>{userInitials}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold text-foreground truncate">{userDisplayName}</span>
                                        <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                                    </div>
                                </div>
                                <Link href={dashboardLink} onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 gap-2">
                                        <LayoutDashboard className="size-4" />
                                        <span>Open Workspace</span>
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl border border-border">
                                    Sign In
                                </Link>
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25">Start Free Trial</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
