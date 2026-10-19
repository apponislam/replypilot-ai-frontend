import React from "react";
import { Inbox, Clock, CheckCheck, Sparkles, Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
    totalEmails: number;
    unreadEmails: number;
    readEmails: number;
    autoRepliedEmails: number;
    repliedEmails: number;
    totalUsers: number;
    toneSetting: string;
    isAutoReply: boolean;
    isLoading?: boolean;
}

export function DashboardStats({
    totalEmails,
    unreadEmails,
    readEmails,
    autoRepliedEmails,
    repliedEmails,
    totalUsers,
    isAutoReply,
    isLoading = false,
}: DashboardStatsProps) {
    const stats = [
        {
            title: "Total Inbound",
            value: totalEmails,
            description: "Captured customer emails",
            icon: Inbox,
            accent: "text-ocean bg-ocean/10",
        },
        {
            title: "Pending Review",
            value: unreadEmails,
            description: "Unread inquiries",
            icon: Clock,
            accent: unreadEmails > 0 ? "text-amber-500 bg-amber-500/10" : "text-muted-foreground bg-muted",
        },
        {
            title: "Read / Reviewed",
            value: readEmails,
            description: "Opened & reviewed",
            icon: CheckCheck,
            accent: "text-sky-500 bg-sky-500/10",
        },
        {
            title: "Auto-Replied",
            value: autoRepliedEmails,
            description: isAutoReply ? "AI Autopilot (Active)" : "AI Autopilot (Paused)",
            icon: Sparkles,
            accent: "text-purple-500 bg-purple-500/10",
        },
        {
            title: "Manual Replied",
            value: repliedEmails,
            description: "Sent by team",
            icon: Send,
            accent: "text-emerald-500 bg-emerald-500/10",
        },
        {
            title: "Total Users",
            value: totalUsers,
            description: "Workspace members",
            icon: Users,
            accent: "text-indigo-500 bg-indigo-500/10",
        },
    ];

    return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-border hover:shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground truncate mr-2">
                            {stat.title}
                        </span>
                        <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl", stat.accent)}>
                            <stat.icon className="size-4" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            {isLoading ? (
                                <span className="inline-block size-6 animate-pulse rounded bg-muted" />
                            ) : (
                                stat.value
                            )}
                        </span>
                        <p className="mt-1 text-[11px] text-muted-foreground font-medium truncate">
                            {stat.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
