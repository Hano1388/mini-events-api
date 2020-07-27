import express from 'express';

import EventsController from '../controllers/events';
import { authenticateUser } from '../middleware/authenticateUser';
import { validateEvent } from '../middleware/validateEvent';
import { authorizeUser } from '../middleware/aurhorizeUser';

const router = express.Router();

router.post('/', authenticateUser, validateEvent, EventsController.createEvent)
    .get('/', EventsController.getAllEvents)
    .get('/:id', EventsController.getOneEvent)
    .patch('/:id', authenticateUser, authorizeUser, EventsController.updateEvent)
    .delete('/:id', authenticateUser, authorizeUser, EventsController.deleteEvent)

export = router;