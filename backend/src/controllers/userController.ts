import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';

const userService = new UserService();

export class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json({ users });
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;
    const user = await userService.createUser(body);

    res.status(201).json({ user });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    const user = await userService.updateUser(id, body);

    res.json({ user });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await userService.deleteUser(id);

    res.json({ message: 'User deleted successfully' });
  }
}
