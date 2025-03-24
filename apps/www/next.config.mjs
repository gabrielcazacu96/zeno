import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
}

export default withMDX(config)
