"use client";

import React, { useState, useEffect } from "react";
import {
    Sparkles,
    Bot,
    Save,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    Mail,
    RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSettingsQuery, useUpdateSettingsMutation, ToneType, UpdateSettingRequest } from "@/redux/features/setting/settingApi";
import { useMounted } from "@/hooks/use-mounted";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const isMounted = useMounted();

    if (!isMounted) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="size-6 animate-spin rounded-full border-2 border-ocean border-t-transparent" />
            </div>
        );
    }

    return <SettingsContent />;
}

export function SettingsContent() {
    const user = useAppSelector(currentUser);
    const isAdmin = user?.role === "ADMIN";

    const {
        data: settingsData,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useGetSettingsQuery();
    const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();

    const [isAutoReply, setIsAutoReply] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [tone, setTone] = useState<ToneType>("professional");
    const [instructions, setInstructions] = useState("");
    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");

    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        if (settingsData?.data) {
            setIsAutoReply(Boolean(settingsData.data.isAutoReply));
            setTone(settingsData.data.tone || "professional");
            setInstructions(settingsData.data.instructions || "");
            setSenderName(settingsData.data.senderName || "");
            setSenderEmail(settingsData.data.senderEmail || "");
        }
    }, [settingsData]);

    // Immediately hit API when Auto-Pilot toggle is flipped (no save button needed)
    const handleToggleAutoReply = async (checked: boolean) => {
        setIsAutoReply(checked);
        setIsToggling(true);
        try {
            await updateSettings({ isAutoReply: checked }).unwrap();
            setFeedback({
                type: "success",
                message: checked ? "Auto-Pilot mode activated." : "Auto-Pilot mode paused (manual review mode).",
            });
            setTimeout(() => setFeedback(null), 2500);
        } catch {
            setIsAutoReply(!checked);
            setFeedback({
                type: "error",
                message: "Failed to update Auto-Pilot status. Please try again.",
            });
            setTimeout(() => setFeedback(null), 3000);
        } finally {
            setIsToggling(false);
        }
    };

    // Save tone, guidelines, and sender information
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);

        try {
            const payload: UpdateSettingRequest = {
                tone,
                instructions: instructions.trim(),
                senderName: senderName.trim(),
                senderEmail: senderEmail.trim(),
            };

            if (isAdmin) {
                payload.isAutoReply = isAutoReply;
            }

            await updateSettings(payload).unwrap();

            setFeedback({
                type: "success",
                message: "Settings saved successfully!",
            });
            setTimeout(() => setFeedback(null), 3000);
        } catch {
            setFeedback({
                type: "error",
                message: "Failed to save settings. Please try again.",
            });
            setTimeout(() => setFeedback(null), 3000);
        }
    };

    const tones: { key: ToneType; title: string; desc: string }[] = [
        {
            key: "professional",
            title: "Professional",
            desc: "Polite, structured, and formal. Ideal for B2B and business communication.",
        },
        {
            key: "friendly",
            title: "Friendly & Warm",
            desc: "Approachable and empathetic. Great for consumer SaaS.",
        },
        {
            key: "concise",
            title: "Concise & Direct",
            desc: "Brief, laser-focused solutions. Best for fast resolution.",
        },
        {
            key: "formal",
            title: "Executive Formal",
            desc: "Authoritative and diplomatic phrasing for VIP accounts.",
        },
        {
            key: "casual",
            title: "Casual",
            desc: "Relaxed and modern conversational tone.",
        },
    ];

    if (isLoading) {
        return (
            <div className="w-full space-y-6">
                <div className="pb-2 border-b border-border/40">
                    <div className="h-7 w-32 rounded-lg bg-muted/70 animate-pulse" />
                    <div className="h-4 w-96 max-w-full rounded-md bg-muted/40 animate-pulse mt-2" />
                </div>

                <div className="w-full rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs space-y-8 animate-pulse">
                    {isAdmin && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="h-5 w-52 rounded bg-muted/70" />
                                    <div className="h-3.5 w-80 rounded bg-muted/40" />
                                </div>
                                <div className="h-6 w-12 rounded-full bg-muted/60" />
                            </div>
                            <div className="border-t border-border/40" />
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="h-5 w-60 rounded bg-muted/70" />
                        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-24 rounded-xl border border-border/60 bg-muted/20" />
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border/40" />

                    <div className="space-y-3">
                        <div className="h-5 w-52 rounded bg-muted/70" />
                        <div className="h-28 rounded-xl bg-muted/30" />
                    </div>

                    <div className="border-t border-border/40" />

                    <div className="space-y-3">
                        <div className="h-5 w-48 rounded bg-muted/70" />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="h-10 rounded-xl bg-muted/30" />
                            <div className="h-10 rounded-xl bg-muted/30" />
                        </div>
                    </div>

                    <div className="border-t border-border/40 pt-2 flex justify-end">
                        <div className="h-11 w-36 rounded-xl bg-muted/60" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full space-y-6">
                <div className="pb-2 border-b border-border/40">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Settings
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {isAdmin
                            ? "Configure your AI auto-reply triggers, response personality, guidelines, and sender identity."
                            : "Configure your AI response personality, custom guidelines, and sender identity."}
                    </p>
                </div>

                <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/5 p-12 text-center space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto">
                        <AlertCircle className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-foreground">Failed to Load Settings</h2>
                        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                            {typeof error === "object" && error && "data" in error && typeof (error as any).data?.message === "string"
                                ? (error as any).data.message
                                : "Unable to retrieve settings from the server. Please check your network connection and try again."}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        className="h-9 px-4 rounded-xl text-xs gap-1.5 border-destructive/30 hover:bg-destructive/10 text-destructive"
                    >
                        <RefreshCw className="size-3.5" />
                        Retry Loading Settings
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Settings
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {isAdmin
                            ? "Configure your AI auto-reply triggers, response personality, guidelines, and sender identity."
                            : "Configure your AI response personality, custom guidelines, and sender identity."}
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    {feedback && (
                        <div
                            className={cn(
                                "flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-medium animate-in fade-in-50",
                                feedback.type === "success"
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                    : "bg-destructive/10 border-destructive/20 text-destructive"
                            )}
                        >
                            {feedback.type === "success" ? (
                                <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                            ) : (
                                <AlertCircle className="size-4 shrink-0" />
                            )}
                            <span>{feedback.message}</span>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="gap-1.5 text-xs h-9 px-3 rounded-xl"
                    >
                        <RefreshCw className={cn("size-3.5", isFetching && "animate-spin")} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* All in 1 Card */}
            <div className="w-full rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Autonomous Auto-Pilot Mode Toggle (Admin Only - Hits API immediately) */}
                    {isAdmin && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Bot className="size-5 text-ocean" />
                                        <h2 className="text-base font-bold text-foreground">
                                            Autonomous Auto-Pilot Mode
                                        </h2>
                                        <span
                                            className={cn(
                                                "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                                                isAutoReply
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                                    : "bg-muted text-muted-foreground border-border"
                                            )}
                                        >
                                            {isAutoReply ? "Active" : "Manual Review"}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        When active, inbound emails are automatically drafted and dispatched without requiring human approval.
                                    </p>
                                </div>

                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={isAutoReply}
                                        disabled={isToggling}
                                        onChange={(e) => handleToggleAutoReply(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-12 h-6.5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-border after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-ocean" />
                                </label>
                            </div>

                            <div className="border-t border-border/50" />
                        </>
                    )}

                    {/* 2. Response Personality & Tone */}
                    <div className="space-y-3.5">
                        <div>
                            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                <Sparkles className="size-4 text-ocean" />
                                <span>Response Personality & Tone</span>
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Select the default tone ReplyPilot uses when generating response drafts.
                            </p>
                        </div>

                        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                            {tones.map((t) => (
                                <div
                                    key={t.key}
                                    onClick={() => setTone(t.key)}
                                    className={cn(
                                        "cursor-pointer rounded-xl border p-3.5 transition-all duration-150 flex flex-col justify-between",
                                        tone === t.key
                                            ? "border-ocean bg-ocean/5 ring-1 ring-ocean shadow-xs"
                                            : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40"
                                    )}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-foreground">{t.title}</span>
                                            {tone === t.key && (
                                                <span className="flex size-4 items-center justify-center rounded-full bg-ocean text-white">
                                                    <CheckCircle2 className="size-3" />
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            {t.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border/50" />

                    {/* 3. Custom Guidelines & Rules */}
                    <div className="space-y-2">
                        <div>
                            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                <HelpCircle className="size-4 text-ocean" />
                                <span>Custom Guidelines & Rules</span>
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Provide guidelines, FAQ rules, or instructions the AI must follow when composing responses.
                            </p>
                        </div>

                        <textarea
                            rows={4}
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. Always remind customers that refunds take 3-5 business days. Never offer discounts higher than 15%."
                            className="w-full rounded-xl border border-border bg-background p-3.5 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean transition-all"
                        />
                    </div>

                    <div className="border-t border-border/50" />

                    {/* 4. Sender Information */}
                    <div className="space-y-3.5">
                        <div>
                            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                <Mail className="size-4 text-ocean" />
                                <span>Sender Information</span>
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                The sender name and email address configured in your settings.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="senderName">Sender Name</Label>
                                <Input
                                    id="senderName"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    placeholder="e.g. ReplyPilot Support"
                                    className="h-10 text-xs rounded-xl"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="senderEmail">Sender Email</Label>
                                <Input
                                    id="senderEmail"
                                    type="email"
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    placeholder="e.g. support@apponislam.top"
                                    className="h-10 text-xs rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="border-t border-border/50 pt-2 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSaving || isLoading}
                            className="bg-ocean hover:bg-ocean-dark text-white h-11 px-8 rounded-xl text-sm font-semibold shadow-xs shadow-ocean/20 transition-all hover:scale-[1.01]"
                        >
                            <Save className="size-4 mr-2" />
                            {isSaving ? "Saving Settings..." : "Save Settings"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
