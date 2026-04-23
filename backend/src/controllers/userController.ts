// import { Request, Response } from 'express';
// import { UserService } from '../services/userService.js';

// const userService = new UserService();

// export class UserController {
//   async getUsers(req: Request, res: Response) {
//     try {
//       const users = await userService.getAllUsers();

//       res.json({ users });
//     } catch (error) {
//       console.error('Error fetching users:', error);

//       res.status(500).json({ error: 'Failed to fetch users' });
//     }
//   }

//   async getUserById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const user = await userService.getUserById(id);

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       res.json({ user });
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ error: 'Failed to fetch user' });
//     }
//   }

//   async createUser(req: Request, res: Response) {
//     try {
//       const body = req.body;
//       const user = await userService.createUser(body);

//       res.status(201).json({ user });
//     } catch (error) {
//       console.error('Error creating user:', error);

//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   }

//   async updateUser(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const user = await userService.updateUser(id, body);

//       res.json({ user });
//     } catch (error) {
//       console.error('Error updating user:', error);

//       res.status(500).json({ error: 'Failed to update user' });
//     }
//   }

//   async deleteUser(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       await userService.deleteUser(id);

//       res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting user:', error);

//       res.status(500).json({ error: 'Failed to delete user' });
//     }
//   }
// }

import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';

export class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, firstName, lastName, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await this.userService.createUser({
        email,
        firstName,
        lastName,
        password,
        role,
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json({ user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const result = await this.userService.signIn({ email, password });

      res.status(200).json({
        message: 'Sign in successful',
        token: result.token,
        user: result.user,
      });
    } catch (error) {
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
