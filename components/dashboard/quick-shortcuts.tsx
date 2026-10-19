import React from "react";
import Link from "next/link";
import { Inbox, Sparkles, Sliders, ArrowRight } from "lucide-react";

export function QuickShortcuts() {
    return (
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold tracking-tight text-foreground">
                Quick Shortcuts
            </h2>

            <div className="flex flex-col gap-2">
                <Link
                    href="/dashboard/emails"
                    className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-ocean/50 hover:bg-ocean/5 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-ocean/10 text-ocean group-hover:bg-ocean group-hover:text-white transition-colors">
                            <Inbox className="size-4" />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-foreground block">
                                Inbound Inbox
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                Review and reply to emails
                            </span>
                        </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-ocean transition-colors" />
                </Link>

                <Link
                    href="/dashboard/replies"
                    className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-ocean/50 hover:bg-ocean/5 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-mint/15 text-mint-dark dark:text-mint group-hover:bg-mint-dark group-hover:text-white transition-colors">
                            <Sparkles className="size-4" />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-foreground block">
                                Draft Replies
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                Generate AI responses
                            </span>
                        </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-ocean transition-colors" />
                </Link>

                <Link
                    href="/dashboard/settings"
                    className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-ocean/50 hover:bg-ocean/5 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-navy/10 text-navy-border dark:text-porcelain group-hover:bg-navy group-hover:text-white transition-colors">
                            <Sliders className="size-4" />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-foreground block">
                                AI Tone Settings
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                                Adjust voice & instructions
                            </span>
                        </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-ocean transition-colors" />
                </Link>
            </div>
        </div>
    );
}
