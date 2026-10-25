/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No ESLint dependency is installed in Phase 1; type checking still runs in `next build`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
