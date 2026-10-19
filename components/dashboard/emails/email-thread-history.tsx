"use client";

import React from "react";
import { IEmail } from "@/redux/features/email/emailApi";

interface EmailThreadHistoryProps {
    replies: IEmail[];
}

export function EmailThreadHistory({ replies }: EmailThreadHistoryProps) {
    if (!replies || replies.length === 0) return null;

    return (
        <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Thread History ({replies.length} past replies)
            </span>
            <div className="space-y-2.5">
                {replies.map((reply) => {
                    const senderLabel =
                        typeof reply.sentBy === "object" && reply.sentBy?.name
                            ? reply.sentBy.name
                            : "Outbound Reply";

                    return (
                        <div
                            key={reply._id}
                            className="rounded-xl border border-border/50 bg-background p-4 text-xs space-y-1.5"
                        >
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="font-semibold text-foreground">{senderLabel}</span>
                                <span>
                                    {new Date(reply.createdAt).toLocaleDateString([], {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                {reply.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
