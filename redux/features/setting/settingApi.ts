import { baseApi } from "../../api/baseApi";
import type { ApiResponse } from "../auth/authSlice";

export type ToneType = "professional" | "friendly" | "concise" | "formal" | "casual";

export interface ISetting {
    _id?: string;
    user?: string;
    isAutoReply: boolean;
    instructions: string;
    tone: ToneType;
    senderName: string;
    senderEmail: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UpdateSettingRequest = Partial<Omit<ISetting, "_id" | "updatedBy" | "createdAt" | "updatedAt">>;

export const settingApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // 1. Get current AI & auto-reply settings
        getSettings: builder.query<ApiResponse<ISetting>, void>({
            query: () => ({
                url: "/settings",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),

        // 2. Update AI & auto-reply settings
        updateSettings: builder.mutation<ApiResponse<ISetting>, UpdateSettingRequest>({
            query: (body) => ({
                url: "/settings",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Setting", "Dashboard"],
        }),
    }),
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
} = settingApi;
