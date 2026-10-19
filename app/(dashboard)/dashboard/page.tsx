"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetAllInboundEmailsQuery } from "@/redux/features/email/emailApi";
import { useGetSettingsQuery } from "@/redux/features/setting/settingApi";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { useMounted } from "@/hooks/use-mounted";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentInquiries } from "@/components/dashboard/recent-inquiries";
import { QuickShortcuts } from "@/components/dashboard/quick-shortcuts";
import { WorkspaceOverview } from "@/components/dashboard/workspace-overview";

export default function DashboardPage() {
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

    return <DashboardContent />;
}

function DashboardContent() {
    const user = useAppSelector(currentUser);
    const userDisplayName = user?.name || "Appon Islam";
    const isAdmin = user?.role === "ADMIN";

    // Real API queries (Admin only)
    const {
        data: inboundData,
        isLoading: isLoadingEmails,
        isError: isErrorEmails,
        refetch: refetchEmails,
    } = useGetAllInboundEmailsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAdmin,
    });

    const {
        data: statsResponse,
        isLoading: isLoadingStats,
        isError: isErrorStats,
        refetch: refetchStats,
    } = useGetDashboardStatsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: !isAdmin,
    });

    const { data: settingsData } = useGetSettingsQuery();

    const emailsList = inboundData?.data || [];
    const statsData = statsResponse?.data;

    // Use live stats from backend /dashboard/stats with graceful fallback
    const totalEmails = statsData ? statsData.totalEmails : emailsList.length;
    const unreadEmails = statsData ? statsData.unreadEmails : emailsList.filter((e) => e.status === "UNREAD").length;
    const readEmails = statsData ? statsData.readEmails : emailsList.filter((e) => e.status === "READ").length;
    const autoRepliedEmails = statsData ? statsData.autoRepliedEmails : emailsList.filter((e) => e.status === "AUTO_REPLIED").length;
    const repliedEmails = statsData ? statsData.repliedEmails : emailsList.filter((e) => e.status === "REPLIED").length;
    const totalUsers = statsData ? statsData.totalUsers : 1;
    const isAutoReply = statsData ? Boolean(statsData.isAutoReply) : Boolean(settingsData?.data?.isAutoReply);
    const toneSetting = settingsData?.data?.tone || "professional";

    const handleRefreshAll = () => {
        refetchEmails();
        refetchStats();
    };

    return (
        <div className="space-y-8">
            <DashboardHeader userDisplayName={userDisplayName} isLoading={isLoadingEmails || isLoadingStats} onRefresh={handleRefreshAll} />

            {(isErrorEmails || isErrorStats) && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-xs text-destructive">
                    <div className="flex items-center gap-2.5">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>Unable to sync dashboard live data with the server. Please check your connection.</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshAll}
                        className="text-xs gap-1.5 border-destructive/30 hover:bg-destructive/10 text-destructive shrink-0 self-start sm:self-auto h-8 px-3 rounded-lg"
                    >
                        <RefreshCw className="size-3.5" />
                        Retry Sync
                    </Button>
                </div>
            )}

            <DashboardStats
                totalEmails={totalEmails}
                unreadEmails={unreadEmails}
                readEmails={readEmails}
                autoRepliedEmails={autoRepliedEmails}
                repliedEmails={repliedEmails}
                totalUsers={totalUsers}
                toneSetting={toneSetting}
                isAutoReply={isAutoReply}
                isLoading={isLoadingStats}
            />

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <RecentInquiries
                        emails={emailsList.slice(0, 6)}
                        isLoading={isLoadingEmails}
                        isError={isErrorEmails}
                        onRetry={refetchEmails}
                    />
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <QuickShortcuts />
                    <WorkspaceOverview toneSetting={toneSetting} isAutoReply={isAutoReply} />
                </div>
            </div>
        </div>
    );
}
