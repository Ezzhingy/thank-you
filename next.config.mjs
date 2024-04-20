/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/login",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin, same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
};

export default nextConfig;
