/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            pathname: '/Koniverse/SubWallet-ChainList/**',
          },
        ],
      },
};

export default nextConfig;
