"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const emptySubscribe = () => () => {};

export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
    const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    const user = useAppSelector(currentUser);
    const router = useRouter();

    useEffect(() => {
        if (isMounted && user) {
            router.replace("/dashboard");
        }
    }, [isMounted, user, router]);

    // Show a loading spinner during rehydration or while redirecting logged-in users
    if (!isMounted || user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean border-t-transparent" />
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthRedirectProvider;
