import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { UserDTO } from '../dto/user.dto.js';
import { UserService } from '../services/userService.js';

export class AuthController {
  private readonly authService = new AuthService();
  private readonly userService = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const { token, user } = await this.authService.login(email, password);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 10,
        //maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días en ms
      });

      const userResponse = new UserDTO(user);
      return res.json({ ok: true, user: userResponse });
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

      const userResponse = new UserDTO(newUser);

      return res.status(201).json(userResponse);
    } catch (error) {
      console.error('Error registering user:', error);

      if (error instanceof Error && error.message === 'EMAIL_ALREADY_IN_USE') {
        return res.status(409).json({ error: 'Email is already in use' });
      }

      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user!;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userResponse = new UserDTO(user);
      return res.json({ user: userResponse });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.json({ ok: true });
  }
}
