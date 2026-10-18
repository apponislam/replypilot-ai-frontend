import { baseApi } from "../../api/baseApi";
import type { ApiResponse } from "../auth/authSlice";

export type EmailType = "INBOUND" | "OUTBOUND";
export type EmailStatus = "UNREAD" | "READ" | "REPLIED" | "SENT" | "ARCHIVED";

export interface IEmailAttachment {
    id?: string;
    filename?: string;
    contentType?: string;
    size?: number;
    contentDisposition?: string;
    contentId?: string;
    downloadUrl?: string;
}

export interface IEmail {
    _id: string;
    type: EmailType;
    replyTo?: string | IEmail | null;
    emailId?: string;
    messageId?: string;
    from: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    replyToEmail?: string;
    subject: string;
    text?: string;
    html?: string;
    summary?: string;
    aiDraft?: string;
    status: EmailStatus;
    sentBy?: string | { _id: string; name: string; email: string; role: string } | null;
    attachments?: IEmailAttachment[];
    createdAt: string;
    updatedAt: string;
}

export interface IEmailThread {
    email: IEmail;
    replies: IEmail[];
}

export interface GetEmailsQueryParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    status?: EmailStatus | "ALL";
    sort?: string;
    [key: string]: unknown;
}

export interface GenerateDraftReplyRequest {
    id: string;
    tone?: "professional" | "friendly" | "concise" | "formal" | "casual" | string;
    instructions?: string;
    customPrompt?: string;
}

export interface SendOutboundReplyRequest {
    id: string;
    replyText: string;
}

export interface UpdateEmailStatusRequest {
    id: string;
    status: EmailStatus;
}

export const emailApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // 1. List all inbound emails (paginated, searchable, filterable)
        getAllInboundEmails: builder.query<ApiResponse<IEmail[]>, GetEmailsQueryParams | void>({
            query: (params) => {
                const queryParams: Record<string, unknown> = {};
                if (params) {
                    if (params.page) queryParams.page = params.page;
                    if (params.limit) queryParams.limit = params.limit;
                    if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
                    if (params.status && params.status !== "ALL") queryParams.status = params.status;
                    if (params.sort) queryParams.sort = params.sort;
                }
                return {
                    url: "/email",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result?.data
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "Email" as const, id: _id })),
                          { type: "Email", id: "LIST" },
                      ]
                    : [{ type: "Email", id: "LIST" }],
        }),

        // 2. Get email details with threaded replies
        getEmailWithReplies: builder.query<ApiResponse<IEmailThread>, string>({
            query: (id) => ({
                url: `/email/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, id) => [
                { type: "Email", id },
                { type: "Email", id: "THREAD" },
            ],
        }),

        // 3. Generate AI draft reply for an email
        generateDraftReply: builder.mutation<ApiResponse<IEmail>, GenerateDraftReplyRequest>({
            query: ({ id, ...body }) => ({
                url: `/email/${id}/generate-reply`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Email", id },
                { type: "Email", id: "LIST" },
            ],
        }),

        // 4. Send outbound reply to an email thread
        sendOutboundReply: builder.mutation<ApiResponse<IEmail>, SendOutboundReplyRequest>({
            query: ({ id, replyText }) => ({
                url: `/email/${id}/send-reply`,
                method: "POST",
                body: { replyText },
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Email", id },
                { type: "Email", id: "LIST" },
            ],
        }),

        // 5. Update email status (e.g. READ, ARCHIVED, REPLIED)
        updateEmailStatus: builder.mutation<ApiResponse<IEmail>, UpdateEmailStatusRequest>({
            query: ({ id, status }) => ({
                url: `/email/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Email", id },
                { type: "Email", id: "LIST" },
            ],
        }),

        // 6. Delete email
        deleteEmail: builder.mutation<ApiResponse<IEmail>, string>({
            query: (id) => ({
                url: `/email/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Email", id },
                { type: "Email", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllInboundEmailsQuery,
    useGetEmailWithRepliesQuery,
    useGenerateDraftReplyMutation,
    useSendOutboundReplyMutation,
    useUpdateEmailStatusMutation,
    useDeleteEmailMutation,
} = emailApi;
