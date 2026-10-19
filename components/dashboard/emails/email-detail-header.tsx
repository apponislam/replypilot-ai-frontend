"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IEmail } from "@/redux/features/email/emailApi";
import { cn } from "@/lib/utils";

interface EmailDetailHeaderProps {
    email: IEmail;
    onRefresh: () => void;
    isRefreshing?: boolean;
}

export function EmailDetailHeader({ email, onRefresh, isRefreshing }: EmailDetailHeaderProps) {
    const isUnread = email.status === "UNREAD";
    const isReplied = email.status === "REPLIED";
    const isAutoReplied = email.status === "AUTO_REPLIED";

    return (
        <div className="space-y-4">
            {/* Top Navigation & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
                <Link
                    href="/dashboard/emails"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Inbox</span>
                </Link>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="h-8 px-3 rounded-lg text-xs gap-1.5 self-start sm:self-auto"
                >
                    <RefreshCw className={cn("size-3", isRefreshing && "animate-spin")} />
                    <span>Refresh</span>
                </Button>
            </div>

            {/* Email Meta & Title */}
            <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                        className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                            isReplied
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : isAutoReplied
                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                : isUnread
                                ? "bg-ocean/10 text-ocean border border-ocean/20"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {email.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" />
                        {new Date(email.createdAt).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {email.subject}
                </h1>

                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    <span>From:</span>
                    <span className="font-semibold text-foreground">{email.from}</span>
                    {email.to && email.to.length > 0 && (
                        <>
                            <span>• To:</span>
                            <span className="text-foreground">{email.to.join(", ")}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
