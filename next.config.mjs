/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Digital_graveyard' : '',
  assetPrefix: isProd ? '/Digital_graveyard/' : '',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
