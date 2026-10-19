"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetEmailWithRepliesQuery } from "@/redux/features/email/emailApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useMounted } from "@/hooks/use-mounted";
import { EmailDetailHeader } from "@/components/dashboard/emails/email-detail-header";
import { EmailInquiryCard } from "@/components/dashboard/emails/email-inquiry-card";
import { EmailThreadHistory } from "@/components/dashboard/emails/email-thread-history";
import { EmailReplyComposer } from "@/components/dashboard/emails/email-reply-composer";

export default function EmailDetailPage() {
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

    return <EmailDetailContent />;
}

function EmailDetailContent() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const emailId = params?.id || "";

    const {
        data: emailResponse,
        isLoading,
        isFetching,
        refetch,
    } = useGetEmailWithRepliesQuery(emailId, {
        skip: !emailId,
        refetchOnMountOrArgChange: true,
    });

    const emailData = emailResponse?.data?.email;
    const threadedReplies = emailResponse?.data?.replies || [];

    if (isLoading) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-3">
                <RefreshCw className="size-6 text-ocean animate-spin" />
                <p className="text-xs text-muted-foreground font-medium">Loading email inquiry...</p>
            </div>
        );
    }

    if (!emailData) {
        return (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card space-y-4">
                <Mail className="size-10 text-muted-foreground mx-auto opacity-50" />
                <div>
                    <h2 className="text-base font-bold text-foreground">Inquiry Not Found</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        The email inquiry you requested could not be located or has been archived.
                    </p>
                </div>
                <Link href="/dashboard/emails">
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-xs">
                        <ArrowLeft className="size-3.5 mr-1.5" />
                        Back to Inbox
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <EmailDetailHeader email={emailData} onRefresh={refetch} isRefreshing={isFetching} />

            <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs space-y-6">
                <EmailInquiryCard text={emailData.text} />
                <EmailThreadHistory replies={threadedReplies} />
                <EmailReplyComposer
                    emailId={emailData._id}
                    initialDraft={emailData.aiDraft || emailData.summary || ""}
                    onSuccess={() => {
                        refetch();
                        router.push("/dashboard/emails");
                    }}
                />
            </div>
        </div>
    );
}
