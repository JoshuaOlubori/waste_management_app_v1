/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID,
    geminiApiKey: process.env.GEMINI_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig;
