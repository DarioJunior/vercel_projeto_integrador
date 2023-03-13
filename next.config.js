/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    VERCEL_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
