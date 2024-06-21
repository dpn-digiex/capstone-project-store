/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
