import React from "react";
import { Inbox, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
    totalEmails: number;
    unreadEmails: number;
    repliedEmails: number;
    toneSetting: string;
    isAutoReply: boolean;
}

export function DashboardStats({
    totalEmails,
    unreadEmails,
    repliedEmails,
    toneSetting,
    isAutoReply,
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
            title: "Replied",
            value: repliedEmails,
            description: "Responses sent",
            icon: CheckCircle2,
            accent: "text-emerald-500 bg-emerald-500/10",
        },
        {
            title: "AI Tone",
            value: toneSetting.charAt(0).toUpperCase() + toneSetting.slice(1),
            description: isAutoReply ? "Auto-reply enabled" : "Manual review mode",
            icon: Sparkles,
            accent: "text-mint-dark dark:text-mint bg-mint/15",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="rounded-2xl border border-border/60 bg-card p-5 shadow-xs transition-all hover:border-border hover:shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {stat.title}
                        </span>
                        <div className={cn("flex size-9 items-center justify-center rounded-xl", stat.accent)}>
                            <stat.icon className="size-4.5" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            {stat.value}
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground font-medium">
                            {stat.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
