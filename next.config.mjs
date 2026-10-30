/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: { NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_PAGES === 'true' ? '/story-seed' : '' },
  basePath: process.env.GITHUB_PAGES === 'true' ? '/story-seed' : '',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
