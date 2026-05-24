import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validate } from '../middleware/validateUserInput.js';
import { registerSchema } from '../validators/schemas.js';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.post('/', validate(registerSchema), (req, res, next) =>
  userController.createUser(req, res, next)
);
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.put('/:id', authenticate, (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', authenticate, (req, res) => userController.deleteUser(req, res));

export default userRouter;
