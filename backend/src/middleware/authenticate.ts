import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // 1. Read the Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check it starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided. Please log in.' });
  }

  // 3. Extract the token
  const token = authHeader.substring(7);

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, JWT_SECRET!);

    // 5. Validate payload structure
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

    // 7. Attach the payload to req.user and call next()
    req.user = decoded as { userId: string; role: string }; // Attach user data to request
    next(); // Continue to the actual route
    return;
  } catch (error) {
    // Token is invalid, expired, or secret is incorrect
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token has expired. Please log in again.' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
    return res.status(401).json({ error: 'Authentication failed.' });
  }
}
