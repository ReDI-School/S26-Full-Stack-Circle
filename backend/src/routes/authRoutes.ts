import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validators/schemas.js';
import { validate } from 'src/middleware/validateUserInput.js';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/login', validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next)
);

authRouter.post('/register', validate(registerSchema), (req, res, next) =>
  authController.register(req, res, next)
);

export default authRouter;
