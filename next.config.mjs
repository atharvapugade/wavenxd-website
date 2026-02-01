/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com", // keep existing
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ add this for Cloudinary
        port: "", // optional
        pathname: "/**", // allow all folders
      },
    ],
  },
};

export default nextConfig;
