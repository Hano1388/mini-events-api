import express from 'express';
import UsersController from '../controllers/users';
import { validateUser } from '../middleware/validateUser';
import { authenticateUser } from '../middleware/authenticateUser'

const router = express.Router();

router.post('/', validateUser, UsersController.createUser)
    .get('/current', authenticateUser, UsersController.currentUser)

export = router;