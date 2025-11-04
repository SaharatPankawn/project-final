const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://157.245.52.10:8090/api/v1/:path*',
      },
    ]
  },
}

export default nextConfig
