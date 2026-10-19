import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ProtectedRouteProvider } from "@/providers/ProtectedRouteProvider";

import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRouteProvider>
            <SidebarProvider>
                <React.Suspense fallback={<div className="w-(--sidebar-width) hidden md:block shrink-0" />}>
                    <AppSidebar />
                </React.Suspense>
                <SidebarInset>
                    {/* Top Navigation Bar */}
                    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b border-border/60 bg-background/90 px-4 md:px-6 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="-ml-1 text-foreground/80 hover:text-foreground transition-colors" />
                            <Separator orientation="vertical" className="h-4" />
                            <DashboardBreadcrumb />
                        </div>
                    </header>

                    {/* Dashboard Page Main Content */}
                    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 bg-muted/20">
                        <React.Suspense fallback={<div className="flex h-96 items-center justify-center text-sm text-muted-foreground">Loading workspace...</div>}>{children}</React.Suspense>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRouteProvider>
    );
}
