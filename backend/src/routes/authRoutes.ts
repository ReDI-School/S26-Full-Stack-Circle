import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/login', (req, res) => authController.login(req, res));

export default authRouter;
