import type { NextConfig } from "next";

const cfDomain = (process.env.CLOUDFRONT_DOMAIN || process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '')
  .replace(/^https?:\/\//, '')
  .split('/')[0]
  .trim();

const remotePatterns: Array<{
  protocol: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname?: string;
}> = [
  {
    protocol: 'https',
    hostname: '*.cloudfront.net',
  },
  {
    protocol: 'https',
    hostname: 'www.pajasaapartments.com',
  },
  {
    protocol: 'https',
    hostname: 'pajasaapartments.com',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '8000',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '8000',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '8001',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '8001',
    pathname: '/uploads/**',
  },
];

if (cfDomain && !remotePatterns.some((p) => p.hostname === cfDomain)) {
  remotePatterns.push({
    protocol: 'https',
    hostname: cfDomain,
  });
}

const nextConfig: NextConfig = {
  // Original WordPress permalinks end with a slash (e.g. /in/mumbai/)
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns,
  },
};

export default nextConfig;
