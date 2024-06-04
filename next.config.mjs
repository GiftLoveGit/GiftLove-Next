/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        // domains: ["localhost","homologacao.giftlove.com.br", "homoapi.giftlove.com.br"],
        // loader: 'custom',
        // loaderFile: './src/image/loader.ts',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'homoapi.giftlove.com.br',
                port: '',
                pathname: '/storage/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
    env: {
        apiStorage: 'https://homoapi.giftlove.com.br/storage',
        api: 'https://homoapi.giftlove.com.br/api'
    }
};

export default nextConfig;
