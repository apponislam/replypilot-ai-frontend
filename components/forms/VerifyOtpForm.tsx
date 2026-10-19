"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { verifyOtpSchema, VerifyOtpFormData } from "@/lib/validations/auth";
import {
    useVerifyOtpMutation,
    useResendOtpMutation,
    useLazyVerifyEmailQuery,
    useResendVerificationEmailMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUser, currentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

interface VerifyOtpFormProps {
    email?: string;
}

export function VerifyOtpForm({ email: initialEmail }: VerifyOtpFormProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);

    const isEmailVerification = searchParams.get("type") === "email-verification";
    const email = initialEmail || searchParams.get("email") || "";

    // Password reset OTP hooks
    const [verifyPasswordOtp, { isLoading: isVerifyingPasswordOtp }] = useVerifyOtpMutation();
    const [resendPasswordOtp, { isLoading: isResendingPasswordOtp }] = useResendOtpMutation();

    // Email verification hooks
    const [triggerVerifyEmail, { isLoading: isVerifyingEmail }] = useLazyVerifyEmailQuery();
    const [resendVerificationEmail, { isLoading: isResendingEmail }] = useResendVerificationEmailMutation();

    const isVerifying = isEmailVerification ? isVerifyingEmail : isVerifyingPasswordOtp;
    const isResending = isEmailVerification ? isResendingEmail : isResendingPasswordOtp;

    const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
    const [countdown, setCountdown] = useState(60);
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: "",
        },
    });

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleDigitChange = (index: number, value: string) => {
        const cleanValue = value.replace(/\D/g, "");
        if (!cleanValue && value !== "") return;

        const newDigits = [...digits];
        newDigits[index] = cleanValue.slice(-1);
        setDigits(newDigits);
        setValue("otp", newDigits.join(""), { shouldValidate: true });
        if (serverError) setServerError(null);

        if (cleanValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pastedData) return;

        const newDigits = [...digits];
        for (let i = 0; i < pastedData.length; i++) {
            newDigits[i] = pastedData[i];
        }
        setDigits(newDigits);
        setValue("otp", newDigits.join(""), { shouldValidate: true });
        if (serverError) setServerError(null);

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const onSubmit = async (values: VerifyOtpFormData) => {
        setServerError(null);
        setSuccessMessage(null);

        if (!email) {
            setServerError("Missing email address. Please return to the previous step.");
            return;
        }

        if (isEmailVerification) {
            try {
                await triggerVerifyEmail({
                    email,
                    otp: values.otp,
                }).unwrap();

                dispatch(updateUser({ isEmailVerified: true }));
                const targetRoute = user?.role === "USER" ? "/dashboard/replies" : "/dashboard";
                setSuccessMessage("Email verified successfully! Redirecting...");
                setTimeout(() => {
                    router.push(targetRoute);
                }, 1000);
            } catch (err: unknown) {
                const errorObj = err as { data?: { message?: string }; message?: string };
                setServerError(errorObj?.data?.message || errorObj?.message || "Invalid or expired verification code.");
            }
        } else {
            try {
                const response = await verifyPasswordOtp({
                    email,
                    otp: values.otp,
                }).unwrap();

                const resetToken = response?.data?.token;

                if (resetToken) {
                    setSuccessMessage("Code verified successfully! Redirecting...");
                    setTimeout(() => {
                        router.push(`/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(email)}`);
                    }, 800);
                } else {
                    setServerError("Verification succeeded, but no reset token was returned.");
                }
            } catch (err: unknown) {
                const errorObj = err as { data?: { message?: string }; message?: string };
                setServerError(errorObj?.data?.message || errorObj?.message || "Invalid or expired OTP code. Please request a new one.");
            }
        }
    };

    const handleResend = async () => {
        if (countdown > 0 || isResending) return;
        setServerError(null);
        setSuccessMessage(null);

        if (!email) {
            setServerError("No email specified to resend verification code.");
            return;
        }

        if (isEmailVerification) {
            try {
                await resendVerificationEmail({ email }).unwrap();
                setSuccessMessage("A fresh 6-digit verification code has been sent to your email.");
                setCountdown(60);
                setDigits(["", "", "", "", "", ""]);
                setValue("otp", "");
                inputRefs.current[0]?.focus();
            } catch (err: unknown) {
                const errorObj = err as { data?: { message?: string }; message?: string };
                setServerError(errorObj?.data?.message || errorObj?.message || "Failed to resend verification code. Please try again.");
            }
        } else {
            try {
                await resendPasswordOtp({ email }).unwrap();
                setSuccessMessage("A fresh 6-digit OTP code has been sent to your email.");
                setCountdown(60);
                setDigits(["", "", "", "", "", ""]);
                setValue("otp", "");
                inputRefs.current[0]?.focus();
            } catch (err: unknown) {
                const errorObj = err as { data?: { message?: string }; message?: string };
                setServerError(errorObj?.data?.message || errorObj?.message || "Failed to resend OTP. Please try again.");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-ocean/10 border border-ocean/20 text-ocean dark:text-mint">
                <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="space-y-1.5 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {isEmailVerification ? "Verify your email" : "Enter verification code"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    We sent a 6-digit code to <strong className="text-foreground font-medium">{email || "your email"}</strong>.
                </p>
            </div>

            {successMessage && (
                <div role="status" className="flex items-center gap-3 p-3.5 rounded-xl bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {serverError && (
                <div role="alert" className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{serverError}</span>
                </div>
            )}

            <form id="verify-otp-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
                    {digits.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            id={`otp-digit-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleDigitChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-13 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border border-border bg-background text-foreground shadow-xs focus:border-ocean focus:ring-3 focus:ring-ocean/20 focus:outline-none transition-all duration-150"
                            autoFocus={index === 0}
                            disabled={isVerifying}
                        />
                    ))}
                </div>

                {errors.otp && <p className="text-xs text-destructive text-center font-medium">{errors.otp.message}</p>}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Didn&apos;t receive the code?</span>
                    {countdown > 0 ? (
                        <span className="font-medium text-zinc-500">Resend in {countdown}s</span>
                    ) : (
                        <button type="button" onClick={handleResend} disabled={isResending} className="inline-flex items-center gap-1 font-semibold text-ocean hover:text-ocean-dark dark:text-mint cursor-pointer">
                            {isResending ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Resend code
                                </>
                            )}
                        </button>
                    )}
                </div>

                <Button id="verify-otp-submit-button" type="submit" disabled={isVerifying || digits.join("").length !== 6} className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150">
                    {isVerifying ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        <>
                            Verify & Proceed
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </form>

            <div className="text-center pt-2">
                {isEmailVerification ? (
                    <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                ) : (
                    <Link href="/forgot-password" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Change email address
                    </Link>
                )}
            </div>
        </div>
    );
}

export default VerifyOtpForm;
