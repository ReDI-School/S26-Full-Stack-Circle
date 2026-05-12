import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';

export class AuthController {
  private readonly authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const token = await this.authService.login(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      next(error);
    }
  }
}
