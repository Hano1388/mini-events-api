import express from 'express';
import SessionsController from '../controllers/sessions';
import { Session } from 'inspector';

const router = express.Router();

router.post('/', SessionsController.createSession)
    .delete('/', SessionsController.destroySession);

export = router;