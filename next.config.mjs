/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["localhost","homologacao.giftlove.com.br"],
    },
};

export default nextConfig;
