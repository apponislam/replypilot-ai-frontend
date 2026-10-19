import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WorkspaceOverviewProps {
    toneSetting: string;
    isAutoReply: boolean;
}

export function WorkspaceOverview({
    toneSetting,
    isAutoReply,
}: WorkspaceOverviewProps) {
    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="text-xs font-bold tracking-tight text-foreground">
                    Workspace Overview
                </span>
                <Link
                    href="/dashboard/settings"
                    className="text-[11px] font-medium text-ocean hover:underline"
                >
                    Settings
                </Link>
            </div>

            <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">Active Tone</span>
                    <span className="font-semibold text-foreground capitalize">
                        {toneSetting}
                    </span>
                </div>

                <div className="flex items-center justify-between py-1 border-t border-border/30">
                    <span className="text-muted-foreground">Auto-Reply Dispatch</span>
                    <span
                        className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                            isAutoReply
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {isAutoReply ? "Active" : "Disabled"}
                    </span>
                </div>
            </div>
        </div>
    );
}
