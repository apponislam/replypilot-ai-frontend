import React from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
    userDisplayName: string;
    isLoading: boolean;
    onRefresh: () => void;
}

export function DashboardHeader({ userDisplayName, isLoading, onRefresh }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Welcome back, {userDisplayName}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Here is the real-time summary of your customer support workspace.
                </p>
            </div>

            <div className="flex items-center gap-2.5">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="h-9 px-3 rounded-xl gap-2 text-xs font-medium"
                >
                    <RefreshCw className={cn("size-3.5", isLoading && "animate-spin")} />
                    Refresh
                </Button>
                <Link href="/dashboard/emails">
                    <Button className="h-9 px-4 rounded-xl bg-ocean hover:bg-ocean-dark text-white text-xs font-medium shadow-xs shadow-ocean/20">
                        Go to Inbox
                        <ArrowRight className="size-3.5 ml-1.5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
