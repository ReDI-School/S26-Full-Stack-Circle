import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/login', (req, res, next) => authController.login(req, res, next));

export default authRouter;
