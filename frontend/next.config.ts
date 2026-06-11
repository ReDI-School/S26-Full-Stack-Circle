import type { NextConfig } from 'next';
import { resolveApiUrl } from './src/config/resolveApiUrl';

const environment = process.env.VERCEL_ENV || 'development';
const previewApiUrl =
  environment === 'preview' ? await resolveApiUrl('preview') : process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  turbopack: {
    root: './',
  },
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
    ...(previewApiUrl ? { NEXT_PUBLIC_API_URL: previewApiUrl } : {}),
  },
};

export default nextConfig;
