import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';

/**
 * Express middleware that authenticates incoming requests using a JSON Web Token (JWT).
 *
 * This middleware expects an `Authorization` header in the format:
 * `Bearer <token>`. It performs the following steps:
 *
 * 1. Checks for the presence of the Authorization header and validates its format.
 * 2. Extracts the JWT from the header.
 * 3. Verifies the token using the configured secret.
 * 4. Ensures the decoded payload contains the required `userId` and `role` fields.
 * 5. Attaches the validated payload to `req.user` for downstream handlers.
 *
 * If authentication fails (missing token, invalid format, expired token, or invalid payload),
 * the middleware responds with HTTP 401 Unauthorized and an appropriate error message.
 *
 * On success, it calls `next()` to pass control to the next middleware or route handler.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided. Please log in.' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);

    if (
      typeof decoded !== 'object' ||
      decoded === null ||
      !('userId' in decoded) ||
      !('role' in decoded)
    ) {
      console.warn('Invalid token payload structure');
      return res.status(401).json({
        error: 'Invalid token format',
      });
    }

    req.user = decoded as { userId: string; role: string };
    next();
    return;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token has expired. Please log in again.' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
    return res.status(401).json({ error: 'Authentication failed.' });
  }
}
