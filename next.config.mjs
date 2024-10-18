/** @type {import('next').NextConfig} */
const nextConfig = {
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true
    },
    ...(process.env.NODE_ENV === 'production' ? {
        assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
    } : {})
};

export default nextConfig;
