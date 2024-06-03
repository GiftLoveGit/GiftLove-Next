/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["localhost","homologacao.giftlove.com.br", "homoapi.giftlove.com.br"],
    },
    env: {
        apiStorage: 'https://homoapi.giftlove.com.br/storage',
        api: 'https://homoapi.giftlove.com.br/api'
    }
};

export default nextConfig;
