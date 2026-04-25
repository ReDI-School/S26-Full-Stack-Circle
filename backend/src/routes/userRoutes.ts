import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.post('/', authenticate, (req, res) => userController.createUser(req, res));
userRouter.put('/:id', authenticate, (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', authenticate, (req, res) => userController.deleteUser(req, res));

export default userRouter;
