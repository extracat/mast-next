module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },
        ],
      },
    ]
  },
}