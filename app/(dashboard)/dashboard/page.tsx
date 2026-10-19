"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetAllInboundEmailsQuery } from "@/redux/features/email/emailApi";
import { useGetSettingsQuery } from "@/redux/features/setting/settingApi";
import { useMounted } from "@/hooks/use-mounted";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentInquiries } from "@/components/dashboard/recent-inquiries";
import { QuickShortcuts } from "@/components/dashboard/quick-shortcuts";
import { WorkspaceOverview } from "@/components/dashboard/workspace-overview";

export default function DashboardPage() {
    const isMounted = useMounted();

    if (!isMounted) {
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

    // Real API queries
    const {
        data: inboundData,
        isLoading: isLoadingEmails,
        refetch,
    } = useGetAllInboundEmailsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: settingsData } = useGetSettingsQuery();

    const emailsList = inboundData?.data || [];

    // Real metrics calculated from live database
    const totalEmails = emailsList.length;
    const unreadEmails = emailsList.filter((e) => e.status === "UNREAD").length;
    const repliedEmails = emailsList.filter((e) => e.status === "REPLIED" || e.status === "AUTO_REPLIED").length;
    const toneSetting = settingsData?.data?.tone || "professional";
    const isAutoReply = Boolean(settingsData?.data?.isAutoReply);
    const senderName = settingsData?.data?.senderName || userDisplayName;

    return (
        <div className="space-y-8">
            <DashboardHeader
                userDisplayName={userDisplayName}
                isLoading={isLoadingEmails}
                onRefresh={() => refetch()}
            />

            <DashboardStats
                totalEmails={totalEmails}
                unreadEmails={unreadEmails}
                repliedEmails={repliedEmails}
                toneSetting={toneSetting}
                isAutoReply={isAutoReply}
            />

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <RecentInquiries
                        emails={emailsList.slice(0, 6)}
                        isLoading={isLoadingEmails}
                    />
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <QuickShortcuts />
                    <WorkspaceOverview
                        toneSetting={toneSetting}
                        isAutoReply={isAutoReply}
                    />
                </div>
            </div>
        </div>
    );
}
