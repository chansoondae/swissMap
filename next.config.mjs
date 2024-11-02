/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_MAPS_API_KEY: "AIzaSyD8vyUXzwDpBevFhq0EiUHIfRqZYsN9XGc",
        // GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
};

export default nextConfig;


// clientId: process.env.GOOGLE_CLIENT_ID as string,