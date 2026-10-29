/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/story-seed' : '',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
