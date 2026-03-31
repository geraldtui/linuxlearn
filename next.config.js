/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en'
      },
      {
        source: '/learn',
        destination: '/en/learn'
      },
      {
        source: '/learn/:lesson*',
        destination: '/en/learn/:lesson*'
      }
    ];
  }
}

module.exports = nextConfig
