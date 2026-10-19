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
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { useMounted } from "@/hooks/use-mounted";

export function EmailVerificationAlert() {
    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }

    return <EmailVerificationAlertContent />;
}

function EmailVerificationAlertContent() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);

    const {
        data: verificationData,
        isLoading: isChecking,
    } = useCheckEmailVerifiedQuery(undefined, {
        skip: !user,
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
            setResendStatus("Verification code sent to your inbox.");
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
        <aside
            aria-label="Email verification notice"
            className="sticky top-16 z-10 w-full border-b border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/15 backdrop-blur-md px-4 md:px-6 py-2.5 transition-all"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        <MailWarning className="size-4" />
                    </div>
                    <div className="min-w-0 text-xs text-amber-900 dark:text-amber-200">
                        <span>
                            Your account email{" "}
                            <strong className="font-semibold text-amber-950 dark:text-amber-100">
                                {email}
                            </strong>{" "}
                            has not been verified yet. Enter your 6-digit code to enable full access.
                        </span>
                        {resendStatus && (
                            <span className="ml-2 font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                                <CheckCircle2 className="size-3 shrink-0" />
                                {resendStatus}
                            </span>
                        )}
                        {resendError && (
                            <span className="ml-2 font-medium text-destructive inline-flex items-center gap-1">
                                <AlertCircle className="size-3 shrink-0" />
                                {resendError}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleResend}
                        disabled={isResending || countdown > 0}
                        className="h-8 px-3 rounded-lg text-amber-900 hover:text-amber-950 dark:text-amber-200 dark:hover:text-amber-100 hover:bg-amber-500/20 text-xs font-medium border border-amber-500/30"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="size-3 mr-1.5 animate-spin" />
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
                            className="h-8 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                            Verify Now
                            <ArrowRight className="size-3 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </aside>
    );
}

export default EmailVerificationAlert;
