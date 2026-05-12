import 'dotenv/config';

// Validate critical env vars BEFORE starting server
export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET is not set. Check your .env file.');
  process.exit(1);
}
