"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    MessageSquareText,
    LayoutDashboard,
    Inbox,
    Sparkles,
    Settings,
    LogOut,
    ShieldCheck,
    Loader2,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { cn, getUserAvatarUrl } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { baseApi } from "@/redux/api/baseApi";
import { persistor } from "@/redux/store";

// Curated navigation items with role restrictions
const allNavItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN"],
    },
    {
        title: "Inbound Emails",
        url: "/dashboard/emails",
        icon: Inbox,
        roles: ["ADMIN"],
    },
    {
        title: "Draft Replies",
        url: "/dashboard/replies",
        icon: Sparkles,
        roles: ["ADMIN", "USER"],
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ["ADMIN", "USER"],
    },
];

function SidebarNavItems() {
    const pathname = usePathname();
    const user = useAppSelector(currentUser);
    const userRole = user?.role || "ADMIN";

    const visibleItems = allNavItems.filter((item) => item.roles.includes(userRole));

    return (
        <SidebarMenu className="gap-2.5">
            {visibleItems.map((item) => {
                const isActive =
                    item.url === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(item.url);

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            isActive={isActive}
                            render={<Link href={item.url} />}
                            tooltip={item.title}
                            className={cn(
                                "h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3",
                                isActive
                                    ? "bg-ocean text-white shadow-sm shadow-ocean/30 font-semibold hover:bg-ocean-dark hover:text-white"
                                    : "text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "size-4.5 shrink-0",
                                    isActive ? "text-white" : "text-sidebar-foreground/60"
                                )}
                            />
                            <span className="truncate">{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}

function SidebarNavFallback() {
    return (
        <SidebarMenu className="gap-2.5">
            {allNavItems.slice(0, 2).map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        render={<Link href={item.url} />}
                        tooltip={item.title}
                        className="h-11 px-3.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3 text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                    >
                        <item.icon className="size-4.5 shrink-0 text-sidebar-foreground/60" />
                        <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
        } catch {
            // Ignore API network errors during logout to allow client cleanup
        } finally {
            dispatch(logOut());
            dispatch(baseApi.util.resetApiState());
            if (typeof window !== "undefined") {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/login";
            }
            try {
                await persistor.purge();
            } catch (_) {}
        }
    };

    const userDisplayName = user?.name || "User";
    const userDisplayEmail = user?.email || "";
    const userInitials = (userDisplayName || "U")
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border/50" {...props}>
            {/* Brand Header with generous padding */}
            <SidebarHeader className="p-5 border-b border-sidebar-border/40">
                <Link
                    href={user?.role === "USER" ? "/dashboard/replies" : "/dashboard"}
                    className="flex items-center gap-3.5 group transition-opacity hover:opacity-95"
                >
                    <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-linear-to-br from-ocean to-ocean-dark text-white shadow-md shadow-ocean/30 ring-1 ring-white/10 transition-transform group-hover:scale-105">
                        <MessageSquareText className="size-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-bold tracking-tight text-sidebar-foreground text-base">
                            ReplyPilot
                        </span>
                        <span className="truncate text-xs text-sidebar-foreground/60 font-medium">
                            Customer Support
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* Main Navigation Content with generous gaps */}
            <SidebarContent className="px-4 py-6">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-sidebar-foreground/45 px-3 mb-3">
                        Workspace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <React.Suspense fallback={<SidebarNavFallback />}>
                            <SidebarNavItems />
                        </React.Suspense>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer Profile & Logout with clean spacing */}
            <SidebarFooter className="border-t border-sidebar-border/40 p-4 mt-auto">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-sidebar-accent/30 border border-sidebar-border/30 p-2.5 transition-colors hover:bg-sidebar-accent/50">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-linear-to-br from-navy-border to-navy font-bold text-xs text-white shadow-xs">
                            {user?.profileImage ? (
                                <img
                                    src={getUserAvatarUrl(user.profileImage) || ""}
                                    alt={userDisplayName}
                                    className="size-full object-cover"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <span>{userInitials}</span>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="truncate text-xs font-semibold text-sidebar-foreground">
                                    {userDisplayName}
                                </span>
                                {user?.role === "ADMIN" && (
                                    <ShieldCheck className="size-3 text-ocean shrink-0" />
                                )}
                            </div>
                            <span className="truncate text-[11px] text-sidebar-foreground/60">
                                {userDisplayEmail}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        title="Log out"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/15 transition-all disabled:opacity-50"
                        aria-label="Log out"
                    >
                        {isLoggingOut ? (
                            <Loader2 className="size-4 animate-spin text-red-400" />
                        ) : (
                            <LogOut className="size-4" />
                        )}
                    </button>
                </div>
            </SidebarFooter>

            {/* Resizable / Collapsible Rail */}
            <SidebarRail />
        </Sidebar>
    );
}
