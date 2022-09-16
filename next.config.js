/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['catpedia.net', 'images6.fanpop.com']
  }
}

module.exports = nextConfig
