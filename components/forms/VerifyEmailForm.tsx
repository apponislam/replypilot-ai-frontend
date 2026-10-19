"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { verifyEmailSchema, VerifyEmailFormData } from "@/lib/validations/auth";
import {
    useLazyVerifyEmailQuery,
    useResendVerificationEmailMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, updateUser } from "@/redux/features/auth/authSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    MailCheck,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowRight,
    Mail,
    RefreshCw,
} from "lucide-react";

interface VerifyEmailFormProps {
    email?: string;
    token?: string;
    otp?: string;
}

export function VerifyEmailForm(props: VerifyEmailFormProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);

    const email = props.email || searchParams.get("email") || "";
    const token = props.token || searchParams.get("token") || undefined;
    const otp = props.otp || searchParams.get("otp") || undefined;

    const shouldAutoVerify = Boolean(email && (token || otp));

    const [triggerVerifyEmail] = useLazyVerifyEmailQuery();
    const [resendVerification, { isLoading: isResending }] =
        useResendVerificationEmailMutation();

    const [verifyState, setVerifyState] = useState<{
        status: "idle" | "verifying" | "success" | "error";
        message: string | null;
    }>({
        status: shouldAutoVerify ? "verifying" : "idle",
        message: null,
    });

    const [resendStatus, setResendStatus] = useState<{
        type: "success" | "error" | null;
        message: string | null;
    }>({ type: null, message: null });

    // Execute automatic verification when token or otp is present
    useEffect(() => {
        if (!shouldAutoVerify) return;

        let active = true;
        setVerifyState({ status: "verifying", message: null });

        triggerVerifyEmail({ email, token, otp })
            .unwrap()
            .then((res) => {
                if (!active) return;
                setVerifyState({
                    status: "success",
                    message: res?.message || "Email verified successfully!",
                });
                dispatch(updateUser({ isEmailVerified: true }));
            })
            .catch((err: unknown) => {
                if (!active) return;
                const errorObj = err as {
                    data?: { message?: string };
                    message?: string;
                };
                setVerifyState({
                    status: "error",
                    message:
                        errorObj?.data?.message ||
                        errorObj?.message ||
                        "Invalid, expired, or already used email verification link.",
                });
            });

        return () => {
            active = false;
        };
    }, [shouldAutoVerify, email, token, otp, triggerVerifyEmail, dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            email: email || "",
        },
    });

    const onResend = async (values: VerifyEmailFormData) => {
        setResendStatus({ type: null, message: null });
        try {
            const res = await resendVerification({
                email: values.email.trim(),
            }).unwrap();
            setResendStatus({
                type: "success",
                message:
                    res?.message ||
                    "Verification link has been resent! Please check your inbox and spam folder.",
            });
        } catch (err: unknown) {
            const errorObj = err as {
                data?: { message?: string };
                message?: string;
            };
            setResendStatus({
                type: "error",
                message:
                    errorObj?.data?.message ||
                    errorObj?.message ||
                    "Failed to resend verification email. Please try again later.",
            });
        }
    };

    if (verifyState.status === "verifying") {
        return (
            <div className="space-y-6 text-center py-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-ocean/10 border border-ocean/20 text-ocean dark:text-mint mx-auto">
                    <Loader2 className="w-7 h-7 animate-spin" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                        Verifying your email...
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Validating your verification link with the server.
                    </p>
                </div>
            </div>
        );
    }

    if (verifyState.status === "success") {
        const targetRoute =
            user?.role === "USER" ? "/dashboard/replies" : "/dashboard";

        return (
            <div className="space-y-6 text-center py-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                        Email verified successfully
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {verifyState.message ||
                            "Your email has been confirmed. You can now access your ReplyPilot workspace."}
                    </p>
                </div>

                {user ? (
                    <Button
                        onClick={() => router.push(targetRoute)}
                        className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150"
                    >
                        Continue to Workspace
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150"
                    >
                        Proceed to Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-ocean/10 border border-ocean/20 text-ocean dark:text-mint">
                <MailCheck className="w-5 h-5" />
            </div>

            <div className="space-y-1.5 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Email verification
                </h1>
                <p className="text-sm text-muted-foreground">
                    Verify your email address to activate your full support workspace.
                </p>
            </div>

            {verifyState.message && verifyState.status === "error" && (
                <div
                    role="alert"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{verifyState.message}</span>
                </div>
            )}

            {resendStatus.message && (
                <div
                    role={resendStatus.type === "error" ? "alert" : "status"}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-sm border ${
                        resendStatus.type === "success"
                            ? "bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint"
                            : "bg-destructive/10 border-destructive/20 text-destructive"
                    }`}
                >
                    {resendStatus.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{resendStatus.message}</span>
                </div>
            )}

            <form
                id="verify-email-form"
                onSubmit={handleSubmit(onResend)}
                noValidate
                className="space-y-4"
            >
                <div className="space-y-1.5">
                    <Label htmlFor="resend-email" required>
                        Work Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                            id="resend-email"
                            type="email"
                            autoComplete="email"
                            placeholder="alex@company.com"
                            className="pl-10"
                            disabled={isResending}
                            error={Boolean(errors.email)}
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-destructive font-medium pl-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <Button
                    id="resend-email-submit-button"
                    type="submit"
                    disabled={isResending}
                    className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150 mt-2"
                >
                    {isResending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending link...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Resend Verification Link
                        </>
                    )}
                </Button>
            </form>

            <div className="text-center pt-2">
                <Link
                    href="/login"
                    className="text-sm font-semibold text-ocean hover:text-ocean-dark dark:text-mint hover:underline"
                >
                    Return to sign in
                </Link>
            </div>
        </div>
    );
}

export default VerifyEmailForm;

