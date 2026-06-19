import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validators/schemas.js';
import { validate } from '../middleware/validateUserInput.js';
import { authenticate } from '../middleware/authenticate.js';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/login', validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);

authRouter.post('/register', validate(registerSchema), (req, res, next) =>
  authController.register(req, res, next)
);

authRouter.get('/me', authenticate, (req, res, next) => authController.me(req, res, next));
authRouter.post('/logout', (req, res) => authController.logout(req, res));

export default authRouter;
