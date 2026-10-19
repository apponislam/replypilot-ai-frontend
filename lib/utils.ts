export { cn } from "cn";

/**
 * Returns the absolute URL for a user profile image.
 * Prepends the backend base URL if the path is relative.
 */
export function getUserAvatarUrl(profileImage?: string | null): string | null {
    if (!profileImage || typeof profileImage !== "string" || profileImage.trim() === "") {
        return null;
    }
    const cleanImg = profileImage.trim();
    if (
        cleanImg.startsWith("http://") ||
        cleanImg.startsWith("https://") ||
        cleanImg.startsWith("data:") ||
        cleanImg.startsWith("blob:")
    ) {
        return cleanImg;
    }
    const rawBase = process.env.NEXT_PUBLIC_BASE_API || "https://replypilotapi.apponislam.top";
    const baseUrl = rawBase.replace(/\/+$/, "").replace(/\/api\/v1$/, "");
    const cleanPath = cleanImg.startsWith("/") ? cleanImg : `/${cleanImg}`;
    return `${baseUrl}${cleanPath}`;
}
