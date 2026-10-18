"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquareText, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-foreground/80 hover:text-foreground px-3.5 py-2 transition-colors">
                        Sign In
                    </Link>
                    <Link href="/register">
                        <Button className="h-10 px-4 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all">
                            Start Free Trial
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                    </Link>
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
                        <Link href="/login" className="text-center py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl border border-border">
                            Sign In
                        </Link>
                        <Link href="/register">
                            <Button className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25">Start Free Trial</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
