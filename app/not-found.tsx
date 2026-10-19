import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-ocean/10 via-ocean/5 to-background dark:from-ocean/15 dark:via-background dark:to-background px-6 text-center select-none">
            {/* Big, bold 404 typography using site colors */}
            <div className="font-black tracking-tighter leading-none text-[9rem] sm:text-[14rem] md:text-[18rem] bg-linear-to-b from-navy via-ocean to-ocean/30 dark:from-white dark:via-ocean dark:to-ocean/30 bg-clip-text text-transparent">404</div>

            {/* Headings */}
            <h1 className="-mt-4 sm:-mt-8 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">Page not found</h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-sm">Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>

            {/* Single Clean Home Button */}
            <div className="mt-8">
                <Link href="/">
                    <Button className="h-11 px-8 rounded-xl bg-ocean hover:bg-ocean-dark text-white text-sm font-medium shadow-md shadow-ocean/25 transition-all hover:scale-[1.02]">Go to Home</Button>
                </Link>
            </div>
        </main>
    );
}
