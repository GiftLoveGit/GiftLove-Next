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
            {
                protocol: 'https',
                hostname: 'api.giftlove.com.br',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             source: '/:path*',
    //             headers: [
    //                 { key: 'Access-Control-Allow-Credentials', value: 'true' },
    //                 { key: 'Access-Control-Allow-Origin', value: '*' },
    //                 { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
    //                 { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
    //             ],
    //         },
    //         ];
    //     },
    //     async redirects() {
    //         return [];
    // },
    env: {
        apiStorage: 'https://giftlove.com.br/storage',
        api: 'https://giftlove.com.br/api'
    }
};

export default nextConfig;
