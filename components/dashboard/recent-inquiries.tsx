import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, RefreshCw, Inbox } from "lucide-react";
import { IEmail } from "@/redux/features/email/emailApi";
import { cn } from "@/lib/utils";

interface RecentInquiriesProps {
    emails: IEmail[];
    isLoading: boolean;
}

export function RecentInquiries({ emails, isLoading }: RecentInquiriesProps) {
    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-ocean/10 text-ocean">
                        <Mail className="size-4" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold tracking-tight text-foreground">
                            Recent Inbound Inquiries
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Latest customer tickets received
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/emails"
                    className="text-xs font-medium text-ocean hover:text-ocean-dark inline-flex items-center gap-1 transition-colors"
                >
                    <span>View all</span>
                    <ArrowRight className="size-3" />
                </Link>
            </div>

            {/* Inquiries Content */}
            {isLoading ? (
                <div className="py-12 text-center">
                    <RefreshCw className="size-6 text-ocean mx-auto mb-2 animate-spin" />
                    <p className="text-xs text-muted-foreground">Loading inquiries...</p>
                </div>
            ) : emails.length === 0 ? (
                <div className="py-14 text-center rounded-xl border border-dashed border-border/70 bg-muted/20">
                    <Inbox className="size-9 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-foreground">No inbound inquiries yet</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                        When customer inquiries are received, they will appear here automatically for review and response.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-border/40">
                    {emails.map((email) => {
                        const isUnread = email.status === "UNREAD";
                        const isReplied = email.status === "REPLIED";
                        const isAutoReplied = email.status === "AUTO_REPLIED";

                        return (
                            <Link
                                key={email._id}
                                href="/dashboard/emails"
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-2.5 rounded-xl hover:bg-muted/40 transition-colors"
                            >
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-navy/10 dark:bg-navy font-bold text-xs text-foreground/80 mt-0.5">
                                        {email.from.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-foreground truncate">
                                                {email.from}
                                            </span>
                                            {isUnread && (
                                                <span className="size-1.5 rounded-full bg-ocean shrink-0" />
                                            )}
                                        </div>
                                        <h3 className="text-xs font-medium text-foreground/90 truncate group-hover:text-ocean transition-colors mt-0.5">
                                            {email.subject}
                                        </h3>
                                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                            {email.text || "No message body"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                    <span
                                        className={cn(
                                            "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
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
                                    <span className="text-[11px] text-muted-foreground">
                                        {new Date(email.createdAt).toLocaleDateString([], {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
