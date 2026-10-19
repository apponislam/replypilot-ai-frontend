"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

const emptySubscribe = () => () => {};

export function ProtectedRouteProvider({ children }: { children: React.ReactNode }) {
    const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    const user = useAppSelector(currentUser);
    const router = useRouter();

    useEffect(() => {
        if (isMounted && !user) {
            router.replace("/login");
        }
    }, [isMounted, user, router]);

    // Keep children in the tree while checking auth so Next.js prerender validation is satisfied
    if (!isMounted || !user) {
        return (
            <div className="relative">
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gray-50/80 dark:bg-zinc-950/80 backdrop-blur-xs">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-ocean border-t-transparent" />
                </div>
                <div className="pointer-events-none opacity-0">{children}</div>
            </div>
        );
    }

    return <>{children}</>;
}

export default ProtectedRouteProvider;
