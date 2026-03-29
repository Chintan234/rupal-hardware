/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dn5nvvlue/**", // 🔥 IMPORTANT: restrict to your cloud name
      },
    ],
  },
};

export default nextConfig;