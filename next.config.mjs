const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://157.245.52.10:8090/api/:path*', // Go backend ของคุณ
      },
    ]
  },
}

export default nextConfig
