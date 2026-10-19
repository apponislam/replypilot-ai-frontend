"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";

function BreadcrumbInner() {
    const pathname = usePathname();

    let pageTitle = "Dashboard";
    if (pathname.includes("/dashboard/replies")) {
        pageTitle = "Draft Replies";
    } else if (pathname.includes("/dashboard/emails")) {
        pageTitle = "Inbound Emails";
    } else if (pathname.includes("/dashboard/settings")) {
        pageTitle = "Settings";
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-foreground">ReplyPilot</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs font-medium text-ocean dark:text-mint">{pageTitle}</span>
        </div>
    );
}

export function DashboardBreadcrumb() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight text-foreground">ReplyPilot</span>
                </div>
            }
        >
            <BreadcrumbInner />
        </Suspense>
    );
}

export default DashboardBreadcrumb;
