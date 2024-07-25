/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mellow-seahorse-745.convex.cloud'
      }
    ]
  }
}

export default nextConfig
