"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    useCheckEmailVerifiedQuery,
    useResendVerificationEmailMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, updateUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
    MailWarning,
    ArrowRight,
    RefreshCw,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

export function EmailVerificationAlert() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);

    const {
        data: verificationData,
        isLoading: isChecking,
        isFetching,
        refetch,
    } = useCheckEmailVerifiedQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [resendVerification, { isLoading: isResending }] =
        useResendVerificationEmailMutation();

    const [resendStatus, setResendStatus] = useState<string | null>(null);
    const [resendError, setResendError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);

    // Keep Redux user state in sync when check returns verified
    useEffect(() => {
        if (verificationData?.data?.isEmailVerified && user && !user.isEmailVerified) {
            dispatch(updateUser({ isEmailVerified: true }));
        }
    }, [verificationData, user, dispatch]);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((c) => c - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // Check status: prioritize live endpoint result, fallback to Redux user
    const isEmailVerified =
        verificationData?.data?.isEmailVerified ?? user?.isEmailVerified ?? false;

    const email = verificationData?.data?.email || user?.email || "";

    // If verified or still initial loading without user, hide banner
    if (isEmailVerified || (!user && isChecking)) {
        return null;
    }

    const handleResend = async () => {
        if (countdown > 0 || isResending || !email) return;
        setResendStatus(null);
        setResendError(null);

        try {
            await resendVerification({ email }).unwrap();
            setResendStatus("A fresh verification code has been sent to your inbox.");
            setCountdown(60);
            setTimeout(() => setResendStatus(null), 4000);
        } catch (err: unknown) {
            const errorObj = err as { data?: { message?: string }; message?: string };
            setResendError(
                errorObj?.data?.message ||
                    errorObj?.message ||
                    "Failed to resend code. Please try again."
            );
            setTimeout(() => setResendError(null), 4000);
        }
    };

    return (
        <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 shadow-xs transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs">
                        <MailWarning className="size-5" />
                    </div>

                    <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                                Verify your email address
                            </h3>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                Unverified
                            </span>
                        </div>
                        <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                            Your account email <strong className="font-semibold text-amber-950 dark:text-amber-100">{email}</strong> has not been verified yet. Please enter your 6-digit code to enable full access.
                        </p>

                        {resendStatus && (
                            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
                                <CheckCircle2 className="size-3.5 shrink-0" />
                                {resendStatus}
                            </p>
                        )}
                        {resendError && (
                            <p className="text-xs font-medium text-destructive flex items-center gap-1.5 pt-1">
                                <AlertCircle className="size-3.5 shrink-0" />
                                {resendError}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-auto flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        title="Check verification status"
                        className="h-9 px-3 rounded-xl border-amber-500/30 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-medium"
                    >
                        <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline">Check Status</span>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleResend}
                        disabled={isResending || countdown > 0}
                        className="h-9 px-3.5 rounded-xl border-amber-500/30 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-semibold"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                                Sending...
                            </>
                        ) : countdown > 0 ? (
                            `Resend in ${countdown}s`
                        ) : (
                            "Resend Code"
                        )}
                    </Button>

                    <Link href={`/verify-otp?email=${encodeURIComponent(email)}&type=email-verification`}>
                        <Button
                            size="sm"
                            className="h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs shadow-amber-600/30 transition-all hover:scale-[1.02]"
                        >
                            Verify Now
                            <ArrowRight className="size-3.5 ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EmailVerificationAlert;
