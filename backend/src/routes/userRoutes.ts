import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.put('/:id', (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default userRouter;
