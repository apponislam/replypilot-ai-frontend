"use client";

import React from "react";

interface EmailInquiryCardProps {
    text?: string;
}

export function EmailInquiryCard({ text }: EmailInquiryCardProps) {
    return (
        <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Customer Inquiry
            </span>
            <div className="rounded-xl bg-muted/30 border border-border/60 p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans">
                {text || "No message body provided."}
            </div>
        </div>
    );
}
