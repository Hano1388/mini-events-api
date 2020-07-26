import express from 'express';
import SessionsController from '../controllers/sessions';
import { Session } from 'inspector';

const router = express.Router();

router.post('/', SessionsController.create);
router.delete('/', SessionsController.destroy);

export = router;