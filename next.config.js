/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["prolog-api.profy.dev"],
  },
  swcMinify: false,
};

module.exports = nextConfig;
