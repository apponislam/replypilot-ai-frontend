"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    useGenerateDraftReplyMutation,
    useSendOutboundReplyMutation,
} from "@/redux/features/email/emailApi";
import { cn } from "@/lib/utils";

interface EmailReplyComposerProps {
    emailId: string;
    initialDraft?: string;
    onSuccess?: () => void;
}

export function EmailReplyComposer({
    emailId,
    initialDraft = "",
    onSuccess,
}: EmailReplyComposerProps) {
    const [replyText, setReplyText] = useState(initialDraft);
    const [isCopied, setIsCopied] = useState(false);
    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const [generateDraftReply, { isLoading: isGenerating }] = useGenerateDraftReplyMutation();
    const [sendOutboundReply, { isLoading: isSending }] = useSendOutboundReplyMutation();

    // Keep draft synced if initialDraft updates from server
    useEffect(() => {
        if (initialDraft && !replyText) {
            setReplyText(initialDraft);
        }
    }, [initialDraft]);

    const handleRegenerate = async () => {
        if (!emailId) return;
        try {
            const res = await generateDraftReply({
                id: emailId,
                tone: "professional",
            }).unwrap();

            if (res?.data?.aiDraft) {
                setReplyText(res.data.aiDraft);
            }
            setNotification({
                type: "success",
                message: "New AI draft generated successfully!",
            });
            setTimeout(() => setNotification(null), 3000);
        } catch {
            setNotification({
                type: "error",
                message: "Failed to generate new draft. Please try again.",
            });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleSend = async () => {
        if (!emailId || !replyText.trim()) return;

        try {
            await sendOutboundReply({
                id: emailId,
                replyText: replyText.trim(),
            }).unwrap();

            setNotification({
                type: "success",
                message: "Outbound reply sent successfully!",
            });

            setTimeout(() => {
                onSuccess?.();
            }, 1200);
        } catch {
            setNotification({
                type: "error",
                message: "Failed to send outbound reply. Please check connection.",
            });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleCopy = () => {
        if (!replyText) return;
        navigator.clipboard.writeText(replyText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="space-y-3 pt-4 border-t border-border/50">
            {notification && (
                <div
                    className={cn(
                        "flex items-center gap-2 rounded-xl border p-3.5 text-xs font-medium animate-in fade-in-50",
                        notification.type === "success"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-destructive/10 border-destructive/20 text-destructive"
                    )}
                >
                    {notification.type === "success" ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    ) : (
                        <AlertCircle className="size-4 shrink-0" />
                    )}
                    <span>{notification.message}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-ocean" />
                    <h2 className="text-sm font-bold text-foreground">
                        Outbound AI Draft Response (Editable)
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="h-8 px-3 rounded-lg text-xs gap-1.5"
                    >
                        <RefreshCw className={cn("size-3", isGenerating && "animate-spin")} />
                        <span>{isGenerating ? "Regenerating..." : "Regenerate Draft"}</span>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 px-3 rounded-lg text-xs gap-1.5"
                    >
                        {isCopied ? (
                            <>
                                <Check className="size-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="size-3" />
                                <span>Copy</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <textarea
                rows={8}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type or customize the AI response draft here..."
                className="w-full rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean transition-all"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                    type="button"
                    onClick={handleSend}
                    disabled={isSending || !replyText.trim()}
                    className="bg-ocean hover:bg-ocean-dark text-white h-11 px-7 rounded-xl text-sm font-semibold shadow-xs shadow-ocean/20 transition-all hover:scale-[1.01]"
                >
                    <Send className="size-4 mr-2" />
                    {isSending ? "Sending Outbound..." : "Approve & Send Outbound Reply"}
                </Button>
            </div>
        </div>
    );
}
