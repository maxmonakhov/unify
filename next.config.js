/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "*" },
          {
            key: "Access-Control-Allow-Headers",
            value: "*"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
