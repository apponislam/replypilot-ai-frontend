"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await login({
        email: values.email.trim(),
        password: values.password,
      }).unwrap();

      if (response?.data?.accessToken && response?.data?.user) {
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        setServerError(response?.message || "Failed to log in.");
      }
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      setServerError(
        errorObj?.data?.message ||
          errorObj?.message ||
          "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your support workspace.
        </p>
      </div>

      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 p-3.5 rounded-xl bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint text-sm"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email" required>
            Work Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              className="pl-10"
              disabled={isLoading}
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

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password" required>
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-ocean hover:text-ocean-dark dark:text-mint dark:hover:text-mint/80 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-10 pr-10"
              disabled={isLoading}
              error={Boolean(errors.password)}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive font-medium pl-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          id="login-submit-button"
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-ocean hover:text-ocean-dark dark:text-mint hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
