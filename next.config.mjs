/** @type {import('next').NextConfig} */
const nextConfig = {
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true
    },
    ...(process.env.NODE_ENV === 'production' ? {
        basePath: process.env.NEXT_BASE_PATH,
        assetPrefix: process.env.NEXT_BASE_PATH
    } : {})
};

export default nextConfig;
