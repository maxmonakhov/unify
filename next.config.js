/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO: remove. This is done bcs of codegenerated types failure
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
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
