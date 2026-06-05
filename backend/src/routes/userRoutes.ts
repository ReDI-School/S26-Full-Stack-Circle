import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validate } from '../middleware/validateUserInput.js';
import { registerSchema } from '../validators/schemas.js';
import { AuthController } from 'src/controllers/authController.js';

const userController = new UserController();
const authController = new AuthController();
const userRouter = Router();

userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.post('/', validate(registerSchema), (req, res) => userController.createUser(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.put('/:id', authenticate, (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', authenticate, (req, res) => userController.deleteUser(req, res));

userRouter.get('/me', authenticate, (req, res, next) => authController.me(req, res, next));

export default userRouter;
