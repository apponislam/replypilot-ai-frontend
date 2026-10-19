import { baseApi } from "../../api/baseApi";
import type { ApiResponse } from "../auth/authSlice";

export interface IDashboardStats {
    totalEmails: number;
    unreadEmails: number;
    readEmails: number;
    autoRepliedEmails: number;
    repliedEmails: number;
    totalUsers: number;
    isAutoReply: boolean;
}

export const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get dashboard statistics
        getDashboardStats: builder.query<ApiResponse<IDashboardStats>, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
