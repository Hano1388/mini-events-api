import express from 'express';
import UsersController from '../controllers/users';
import { validateUser } from '../middleware/validateUser';

const router = express.Router();

router.post('/', validateUser, UsersController.createUser);

export = router;