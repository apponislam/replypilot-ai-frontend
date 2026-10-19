"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    Inbox,
    Sparkles,
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Clock,
    AlertCircle,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllInboundEmailsQuery, IEmail, EmailStatus } from "@/redux/features/email/emailApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const statusTabs: ("ALL" | EmailStatus)[] = [
    "ALL",
    "UNREAD",
    "READ",
    "REPLIED",
    "AUTO_REPLIED",
    "SENT",
    "ARCHIVED",
];

export default function InboundEmailsPage() {
    const isMounted = useMounted();
    const router = useRouter();
    const user = useAppSelector(currentUser);
    const isUser = user?.role === "USER";

    useEffect(() => {
        if (isMounted && isUser) {
            router.replace("/dashboard/replies");
        }
    }, [isMounted, isUser, router]);

    if (!isMounted || isUser) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="size-6 animate-spin rounded-full border-2 border-ocean border-t-transparent" />
            </div>
        );
    }

    return <InboundEmailsContent />;
}

function InboundEmailsContent() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [filterStatus, setFilterStatus] = useState<"ALL" | EmailStatus>("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: inboundData,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useGetAllInboundEmailsQuery({
        page,
        limit,
        status: filterStatus !== "ALL" ? filterStatus : undefined,
        searchTerm: searchTerm.trim() || undefined,
    });

    const emailsList: IEmail[] = inboundData?.data || [];
    const meta = inboundData?.meta;
    const totalPages = meta?.totalPages || (emailsList.length > 0 ? 1 : 0);
    const totalCount = meta?.total ?? emailsList.length;

    const filtered = useMemo(() => {
        return emailsList.filter((em) => {
            const matchStatus = filterStatus === "ALL" || em.status === filterStatus;
            const matchSearch =
                em.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                em.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (em.text && em.text.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchStatus && matchSearch;
        });
    }, [emailsList, filterStatus, searchTerm]);

    return (
        <div className="w-full space-y-6">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ocean mb-1">
                        <Inbox className="size-3.5" />
                        <span>Support Inbox</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Inbound Inquiries</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Monitor, inspect, and reply to incoming customer emails with AI-assisted drafting.
                    </p>
                </div>

                <Button
                    variant="outline"
                    disabled={isLoading || isFetching}
                    onClick={() => refetch()}
                    className="self-start sm:self-auto text-xs gap-1.5"
                >
                    <RefreshCw className={cn("size-3.5", (isLoading || isFetching) && "animate-spin")} />
                    {isFetching && !isLoading ? "Refreshing..." : "Refresh Inbox"}
                </Button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                    {statusTabs.map((st) => (
                        <button
                            key={st}
                            onClick={() => {
                                setFilterStatus(st);
                                setPage(1);
                            }}
                            className={cn(
                                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shrink-0",
                                filterStatus === st
                                    ? "bg-ocean text-white shadow-xs"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {st.replace("_", " ")}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                    <Input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search email text, sender, subject..."
                        className="h-8 pl-9 text-xs bg-background"
                    />
                </div>
            </div>

            {/* Full-width Email Inbound Inquiries List */}
            <div className="space-y-3 w-full">
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-border/70 bg-card p-5 animate-pulse space-y-3"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="h-4 w-48 rounded bg-muted/70" />
                                    <div className="h-4 w-20 rounded bg-muted/60" />
                                </div>
                                <div className="h-4 w-3/4 rounded bg-muted/80" />
                                <div className="h-3 w-1/2 rounded bg-muted/50" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center space-y-3">
                        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto">
                            <AlertCircle className="size-6" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground">Failed to load inbound emails</h3>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            {typeof error === "object" && error && "data" in error && typeof (error as any).data?.message === "string"
                                ? (error as any).data.message
                                : "An error occurred while connecting to the email service. Please check your network and try again."}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="text-xs gap-1.5 border-destructive/30 hover:bg-destructive/10"
                        >
                            <RefreshCw className="size-3.5" />
                            Try Again
                        </Button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card space-y-3">
                        <Inbox className="size-10 text-muted-foreground mx-auto opacity-40" />
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                {searchTerm || filterStatus !== "ALL"
                                    ? "No matching emails found"
                                    : "Your inbox is clear"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                                {searchTerm || filterStatus !== "ALL"
                                    ? `No emails found matching "${searchTerm || filterStatus}". Try adjusting your search query or status filter.`
                                    : "Incoming customer inquiries will appear here automatically as soon as they are received."}
                            </p>
                        </div>
                        {(searchTerm || filterStatus !== "ALL") && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterStatus("ALL");
                                    setPage(1);
                                }}
                                className="text-xs gap-1.5 h-8 px-3 rounded-lg"
                            >
                                <X className="size-3.5" />
                                Clear Search &amp; Filters
                            </Button>
                        )}
                    </div>
                ) : (
                    filtered.map((em) => (
                        <Link
                            key={em._id}
                            href={`/dashboard/emails/${em._id}`}
                            className="group block rounded-xl border border-border/70 bg-card p-4 sm:p-5 transition-all hover:border-ocean/60 hover:shadow-xs hover:bg-muted/20"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-xs font-semibold text-foreground truncate">
                                        {em.from}
                                    </span>
                                    {em.aiDraft && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-ocean/10 px-2 py-0.5 text-[10px] font-semibold text-ocean shrink-0">
                                            <Sparkles className="size-3" />
                                            AI Draft Ready
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                    <span
                                        className={cn(
                                            "rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                                            em.status === "UNREAD"
                                                ? "bg-ocean/15 text-ocean border border-ocean/20"
                                                : em.status === "REPLIED"
                                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                                : em.status === "AUTO_REPLIED"
                                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                                : em.status === "SENT"
                                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                                : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        {em.status.replace("_", " ")}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="size-3" />
                                        {new Date(em.createdAt).toLocaleDateString([], {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-ocean transition-colors line-clamp-1">
                                        {em.subject}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {em.text || "No preview available."}
                                    </p>
                                </div>
                                <ChevronRight className="size-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-ocean shrink-0" />
                            </div>
                        </Link>
                    ))
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 px-1 text-xs text-muted-foreground border-t border-border/50">
                        <span>
                            Page <strong className="text-foreground">{page}</strong> of{" "}
                            <strong className="text-foreground">{totalPages}</strong>
                            {totalCount > 0 && <span className="ml-1">({totalCount} total)</span>}
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1 || isLoading || isFetching}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="h-8 px-3 rounded-lg text-xs"
                            >
                                <ChevronLeft className="size-3.5 mr-0.5" />
                                Prev
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= totalPages || isLoading || isFetching}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="h-8 px-3 rounded-lg text-xs"
                            >
                                Next
                                <ChevronRight className="size-3.5 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
