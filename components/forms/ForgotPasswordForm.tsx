"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validations/auth";
import { useRequestPasswordResetMutation } from "@/redux/features/auth/authApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft, Loader2, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

export function ForgotPasswordForm() {
    const router = useRouter();
    const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordFormData) => {
        setServerError(null);
        setSuccessMessage(null);

        try {
            const response = await requestPasswordReset({
                email: values.email.trim(),
            }).unwrap();

            setSuccessMessage(response?.message || "Password reset OTP has been sent to your email.");

            setTimeout(() => {
                router.push(`/verify-otp?email=${encodeURIComponent(values.email.trim())}`);
            }, 1000);
        } catch (err: unknown) {
            const errorObj = err as { data?: { message?: string }; message?: string };
            setServerError(errorObj?.data?.message || errorObj?.message || "Could not send password reset OTP. Please check your email and try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-ocean/10 border border-ocean/20 text-ocean">
                <KeyRound className="w-5 h-5" />
            </div>

            <div className="space-y-1.5 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Reset your password</h1>
                <p className="text-sm text-muted-foreground">Enter your registered email and we&apos;ll send you a verification code to reset your password.</p>
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

            <form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="forgot-email" required>
                        Work Email Address
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input id="forgot-email" type="email" autoComplete="email" placeholder="alex@company.com" className="pl-10" disabled={isLoading} error={Boolean(errors.email)} {...register("email")} />
                    </div>
                    {errors.email && <p className="text-xs text-destructive font-medium pl-1">{errors.email.message}</p>}
                </div>

                <Button id="forgot-submit-button" type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150 mt-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending code...
                        </>
                    ) : (
                        <>
                            Send Verification Code
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </form>

            <div className="text-center pt-2">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign in
                </Link>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
