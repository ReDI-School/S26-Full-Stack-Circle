import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const token = await this.authService.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        if (error.message === 'INVALID_CREDENTIALS') {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (error.message === 'JWT_SECRET_MISSING') {
          return res.status(500).json({ error: 'JWT secret is not configured' });
        }
      }

      res.status(500).json({ error: 'Failed to sign in' });
    }
  }
}
