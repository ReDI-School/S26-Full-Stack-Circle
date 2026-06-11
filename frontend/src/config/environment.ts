export function getEnvironment(): string {
  return process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || 'development';
}
