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

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, firstName, lastName, password } = req.body;

      const newUser = await this.authService.register(email, firstName, lastName, password);

      const userResponse = { ...newUser } as any;
      delete userResponse.passwordHash;
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      console.error('Error registering user:', error);

      if (error instanceof Error && error.message === 'EMAIL_ALREADY_IN_USE') {
        return res.status(409).json({ error: 'Email is already in use' });
      }

      next(error);
    }
  }
}
