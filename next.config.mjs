/** @type {import('next').NextConfig} */
const nextConfig = {
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: 'export',
    basePath: '/dashboardfei4',
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
