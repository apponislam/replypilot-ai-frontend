import { baseApi } from "../../api/baseApi";
import type { ApiResponse } from "../auth/authSlice";

export type UserReplyStatus = "DRAFT" | "SENT";

export interface IUserReply {
    _id: string;
    user: string;
    recipientEmail: string;
    subject: string;
    incomingMessage: string;
    generatedReply: string;
    tone: "professional" | "friendly" | "concise" | "formal" | "casual";
    customInstructions?: string;
    status: UserReplyStatus;
    sentAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GenerateUserReplyRequest {
    recipientEmail: string;
    subject: string;
    incomingMessage: string;
    tone?: "professional" | "friendly" | "concise" | "formal" | "casual" | string;
    customInstructions?: string;
}

export interface SendUserReplyRequest {
    id: string;
    editedReply?: string;
}

export interface GetUserRepliesQueryParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    status?: UserReplyStatus | "ALL";
    [key: string]: unknown;
}

export const userReplyApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // 1. Generate an AI reply from incoming message
        generateReply: builder.mutation<ApiResponse<IUserReply>, GenerateUserReplyRequest>({
            query: (body) => ({
                url: "/user-replies/generate",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "UserReply", id: "LIST" }],
        }),

        // 2. Send the generated or edited reply
        sendReply: builder.mutation<ApiResponse<IUserReply>, SendUserReplyRequest>({
            query: ({ id, editedReply }) => ({
                url: `/user-replies/${id}/send`,
                method: "POST",
                body: { editedReply },
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "UserReply", id },
                { type: "UserReply", id: "LIST" },
            ],
        }),

        // 3. List user replies (paginated, searchable)
        getUserReplies: builder.query<ApiResponse<IUserReply[]>, GetUserRepliesQueryParams | void>({
            query: (params) => {
                const queryParams: Record<string, unknown> = {};
                if (params) {
                    if (params.page) queryParams.page = params.page;
                    if (params.limit) queryParams.limit = params.limit;
                    if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
                    if (params.status && params.status !== "ALL") queryParams.status = params.status;
                }
                return {
                    url: "/user-replies",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result?.data
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "UserReply" as const, id: _id })),
                          { type: "UserReply", id: "LIST" },
                      ]
                    : [{ type: "UserReply", id: "LIST" }],
        }),

        // 4. Get a single user reply by ID
        getUserReplyById: builder.query<ApiResponse<IUserReply>, string>({
            query: (id) => ({
                url: `/user-replies/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [
                { type: "UserReply", id },
            ],
        }),

        // 5. Delete a user reply
        deleteUserReply: builder.mutation<ApiResponse<IUserReply>, string>({
            query: (id) => ({
                url: `/user-replies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "UserReply", id },
                { type: "UserReply", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGenerateReplyMutation,
    useSendReplyMutation,
    useGetUserRepliesQuery,
    useGetUserReplyByIdQuery,
    useDeleteUserReplyMutation,
} = userReplyApi;
