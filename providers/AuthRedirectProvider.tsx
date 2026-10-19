"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const emptySubscribe = () => () => {};

export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
    const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    const user = useAppSelector(currentUser);
    const router = useRouter();
    const pathname = usePathname();

    const isVerificationPage = Boolean(pathname?.includes("verify"));
    // Only redirect to dashboard if user is authenticated AND verified AND not on a verification page
    const shouldRedirect = Boolean(isMounted && user && user.isEmailVerified && !isVerificationPage);

    useEffect(() => {
        if (shouldRedirect) {
            const targetRoute = user?.role === "USER" ? "/dashboard/replies" : "/dashboard";
            router.replace(targetRoute);
        }
    }, [shouldRedirect, router, user]);

    if (shouldRedirect) {
        return (
            <div className="relative w-full">
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-xs">
                    <div className="size-8 animate-spin rounded-full border-4 border-ocean border-t-transparent" />
                </div>
                <div className="pointer-events-none opacity-0">{children}</div>
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthRedirectProvider;
