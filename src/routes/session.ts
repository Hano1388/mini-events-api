import express from 'express';
import SessionsController from '../controllers/sessions';

const router = express.Router();

router.post('/', SessionsController.create);

export = router;