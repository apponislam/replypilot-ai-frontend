"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyNewEmailQuery } from "@/redux/features/auth/authApi";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  MailCheck,
} from "lucide-react";

export function VerifyNewEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const { data, error, isLoading, isSuccess } = useVerifyNewEmailQuery(
    { token, email },
    { skip: !token || !email }
  );

  if (!token || !email) {
    return (
      <div className="space-y-6 text-center py-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Invalid verification link
          </h2>
          <p className="text-sm text-muted-foreground">
            The link you clicked is missing verification tokens or email parameters.
          </p>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium shadow-sm shadow-ocean/25"
        >
          Return to Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-ocean/10 border border-ocean/20 text-ocean dark:text-mint mx-auto">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Verifying your new email...
          </h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we update your account email address.
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center py-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Email updated successfully
          </h2>
          <p className="text-sm text-muted-foreground">
            {data?.message ||
              `Your account email has been updated to ${email}. You can now sign in.`}
          </p>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium shadow-sm shadow-ocean/25"
        >
          Proceed to Login
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  const errorObj = error as { data?: { message?: string } } | undefined;
  const failureReason =
    errorObj?.data?.message ||
    "The verification link has expired or is invalid. Please request an update again from your profile.";

  return (
    <div className="space-y-6 text-center py-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mx-auto">
        <MailCheck className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Verification failed
        </h2>
        <p className="text-sm text-muted-foreground">{failureReason}</p>
      </div>
      <div className="pt-2">
        <Link
          href="/login"
          className="text-sm font-semibold text-ocean hover:text-ocean-dark dark:text-mint hover:underline"
        >
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}

export default VerifyNewEmailForm;
