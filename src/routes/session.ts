import express from 'express';
import SessionsController from '../controllers/sessions';
import { validateUser } from '../middleware/validateUser';
import { Session } from 'inspector';

const router = express.Router();

router.post('/', validateUser, SessionsController.createSession)
    .delete('/', SessionsController.destroySession);

export = router;