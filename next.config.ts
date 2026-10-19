import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    partialPrefetching: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    async redirects() {
        return [
            {
                source: "/terms-and-conditions",
                destination: "/terms",
                permanent: true,
            },
            {
                source: "/dashboard/settings/ai",
                destination: "/dashboard/settings",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
