"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { resetPasswordSchema, ResetPasswordFormData } from "@/lib/validations/auth";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

interface ResetPasswordFormProps {
    token?: string;
}

export function ResetPasswordForm({ token: initialToken }: ResetPasswordFormProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = initialToken || searchParams.get("token") || "";
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = useWatch({ control, name: "password" });

    const getStrength = (pass: string) => {
        let score = 0;
        if (pass.length >= 6) score += 1;
        if (pass.length >= 10) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };

    const strength = getStrength(passwordValue || "");
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-ocean", "bg-mint"];

    const onSubmit = async (values: ResetPasswordFormData) => {
        setServerError(null);

        if (!token) {
            setServerError("Missing password reset token. Please request a new password reset link.");
            return;
        }

        try {
            await resetPassword({
                token,
                newPassword: values.password,
            }).unwrap();

            setIsSuccess(true);
        } catch (err: unknown) {
            const errorObj = err as { data?: { message?: string }; message?: string };
            setServerError(errorObj?.data?.message || errorObj?.message || "Password reset failed or token has expired. Please try again.");
        }
    };

    if (isSuccess) {
        return (
            <div className="space-y-6 text-center py-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Password reset successful</h2>
                    <p className="text-sm text-muted-foreground">You can now sign in to your ReplyPilot workspace with your new password.</p>
                </div>

                <Button onClick={() => router.push("/login")} className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150">
                    Sign In Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-ocean/10 border border-ocean/20 text-ocean dark:text-mint">
                <Lock className="w-5 h-5" />
            </div>

            <div className="space-y-1.5 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Create new password</h1>
                <p className="text-sm text-muted-foreground">Enter and confirm your new secure password.</p>
            </div>

            {!token && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>
                        No token found.{" "}
                        <Link href="/forgot-password" className="underline font-semibold">
                            Request reset code
                        </Link>
                        .
                    </span>
                </div>
            )}

            {serverError && (
                <div role="alert" className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{serverError}</span>
                </div>
            )}

            <form id="reset-password-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="reset-password" required>
                        New Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input id="reset-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" className="pl-10 pr-10" disabled={isLoading || !token} error={Boolean(errors.password)} {...register("password")} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5" tabIndex={-1}>
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive font-medium pl-1">{errors.password.message}</p>}

                    {passwordValue && (
                        <div className="space-y-1 pt-1">
                            <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                                <span>Strength:</span>
                                <span className="font-semibold">{strengthLabels[Math.max(0, strength - 1)] || "Too short"}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 h-1.5">
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className={`h-full rounded-full transition-colors duration-300 ${step <= strength ? strengthColors[strength - 1] : "bg-muted"}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="reset-confirm-password" required>
                        Confirm New Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input id="reset-confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" className="pl-10" disabled={isLoading || !token} error={Boolean(errors.confirmPassword)} {...register("confirmPassword")} />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive font-medium pl-1">{errors.confirmPassword.message}</p>}
                </div>

                <Button id="reset-password-submit-button" type="submit" disabled={isLoading || !token} className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150 mt-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating password...
                        </>
                    ) : (
                        <>
                            Save New Password
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </form>

            <div className="text-center pt-2">
                <Link href="/login" className="text-sm font-semibold text-ocean hover:text-ocean-dark dark:text-mint hover:underline">
                    Cancel and return to sign in
                </Link>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
