/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,   
  },
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/api/pharmacy/:path*',
        destination: 'http://15.206.75.63:8000/api/:path*',
      },
      {
        source: '/api/doctor/:path*',
        destination: 'http://127.0.0.1/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig