import * as express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();

router.post('/', UsersController.create);

export = router;