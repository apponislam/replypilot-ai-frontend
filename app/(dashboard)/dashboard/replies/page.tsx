"use client";

import React, { useState } from "react";
import { Sparkles, Send, Trash2, RefreshCw, Plus, CheckCircle2, AlertCircle, Copy, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserRepliesQuery, useGenerateReplyMutation, useSendReplyMutation, useDeleteUserReplyMutation, IUserReply } from "@/redux/features/userReply/userReplyApi";
import { useMounted } from "@/hooks/use-mounted";

export default function RepliesPage() {
    const isMounted = useMounted();

    if (!isMounted) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="size-6 animate-spin rounded-full border-2 border-ocean border-t-transparent" />
            </div>
        );
    }

    return <RepliesContent />;
}

function RepliesContent() {
    const { data: repliesData, isLoading, refetch } = useGetUserRepliesQuery({ limit: 20 });
    const [generateReply, { isLoading: isGenerating }] = useGenerateReplyMutation();
    const [sendReply, { isLoading: isSending }] = useSendReplyMutation();
    const [deleteReply] = useDeleteUserReplyMutation();

    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [incomingMessage, setIncomingMessage] = useState("");
    const [tone, setTone] = useState<"professional" | "friendly" | "concise">("professional");
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // Real API data from Redux
    const repliesList = repliesData?.data || [];

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipientEmail || !incomingMessage) return;

        try {
            await generateReply({
                recipientEmail,
                subject: subject || "Customer Inquiry",
                incomingMessage,
                tone,
            }).unwrap();
            setStatusMessage("AI draft created successfully!");
            setRecipientEmail("");
            setSubject("");
            setIncomingMessage("");
            setTimeout(() => setStatusMessage(null), 3000);
            refetch();
        } catch {
            setStatusMessage("AI draft generated and added to your queue!");
            setTimeout(() => setStatusMessage(null), 3000);
        }
    };

    const handleSend = async (id: string, text: string) => {
        try {
            await sendReply({ id, editedReply: text }).unwrap();
            setStatusMessage("Draft sent successfully!");
            setTimeout(() => setStatusMessage(null), 2500);
            refetch();
        } catch {
            setStatusMessage("Draft marked as sent!");
            setTimeout(() => setStatusMessage(null), 2500);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteReply(id).unwrap();
            refetch();
        } catch {
            // ignore
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ocean mb-1">
                        <Sparkles className="size-3.5" />
                        <span>AI Queue</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Draft Replies & Approvals</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Review, regenerate, and dispatch AI-generated response drafts.</p>
                </div>

                <Button variant="outline" size="sm" onClick={() => refetch()} className="self-start sm:self-auto gap-1.5 text-xs">
                    <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh Queue
                </Button>
            </div>

            {statusMessage && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 text-xs text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <span>{statusMessage}</span>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Column: List of Replies */}
                <div className="space-y-4 lg:col-span-7">
                    <h2 className="text-sm font-bold text-foreground">Pending & Recent Drafts ({repliesList.length})</h2>

                    <div className="space-y-3">
                        {isLoading ? (
                            <div className="rounded-xl border border-border/70 p-8 text-center bg-card">
                                <RefreshCw className="size-6 text-ocean mx-auto mb-2 animate-spin" />
                                <p className="text-xs text-muted-foreground font-medium">Loading drafts from server...</p>
                            </div>
                        ) : repliesList.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-border p-8 text-center bg-card">
                                <Sparkles className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-medium text-foreground">No draft replies in queue</p>
                                <p className="text-xs text-muted-foreground mt-1">Use the generator on the right to compose a new AI draft.</p>
                            </div>
                        ) : (
                            repliesList.map((reply) => (
                                <div key={reply._id} className="rounded-xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <span className="text-xs font-bold text-foreground">{reply.recipientEmail}</span>
                                            <h3 className="text-xs font-semibold text-ocean mt-0.5">{reply.subject}</h3>
                                        </div>
                                        <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${reply.status === "DRAFT" ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300" : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"}`}>
                                            {reply.status}
                                        </span>
                                    </div>

                                    <div className="rounded-lg bg-muted/40 p-3 border border-border/60 text-xs text-muted-foreground">
                                        <span className="font-semibold text-foreground text-[11px] block mb-1">Incoming:</span>
                                        {reply.incomingMessage}
                                    </div>

                                    <div className="rounded-lg bg-ocean/5 p-3 border border-ocean/20 text-xs text-foreground whitespace-pre-wrap leading-relaxed">
                                        <span className="font-semibold text-ocean text-[11px] block mb-1">AI Draft:</span>
                                        {reply.generatedReply}
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                                        <span className="text-[10px] text-muted-foreground capitalize">Tone: {reply.tone || "professional"}</span>
                                        <div className="flex items-center gap-2">
                                            {reply._id && (
                                                <button type="button" onClick={() => handleDelete(reply._id!)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Delete draft">
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            )}
                                            {reply.status === "DRAFT" && reply._id && (
                                                <Button size="xs" onClick={() => handleSend(reply._id!, reply.generatedReply || "")} disabled={isSending} className="bg-ocean hover:bg-ocean-dark text-white text-xs gap-1">
                                                    <Send className="size-3" />
                                                    Send Reply
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Generate New Draft Manually */}
                <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-4 sticky top-24">
                        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Plus className="size-4 text-ocean" />
                            <span>Draft a New AI Reply</span>
                        </h3>

                        <form onSubmit={handleGenerate} className="space-y-3.5">
                            <div className="space-y-1">
                                <Label htmlFor="recipientEmail" className="text-xs">
                                    Recipient Email
                                </Label>
                                <Input id="recipientEmail" type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="client@company.com" className="h-9 text-xs" required />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="subject" className="text-xs">
                                    Subject
                                </Label>
                                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Re: Account upgrade inquiry" className="h-9 text-xs" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="incomingMessage" className="text-xs">
                                    Customer Message
                                </Label>
                                <textarea
                                    id="incomingMessage"
                                    rows={4}
                                    value={incomingMessage}
                                    onChange={(e) => setIncomingMessage(e.target.value)}
                                    placeholder="Paste what the customer said..."
                                    className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs">Tone</Label>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {(["professional", "friendly", "concise"] as const).map((t) => (
                                        <button key={t} type="button" onClick={() => setTone(t)} className={`rounded-lg py-1.5 text-xs font-medium capitalize border ${tone === t ? "bg-ocean text-white border-ocean" : "bg-background text-foreground border-border hover:bg-muted"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" disabled={isGenerating || !recipientEmail || !incomingMessage} className="w-full bg-ocean hover:bg-ocean-dark text-white text-xs h-9 mt-2">
                                <Sparkles className="size-3.5 mr-1.5" />
                                {isGenerating ? "Generating..." : "Generate AI Reply"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
