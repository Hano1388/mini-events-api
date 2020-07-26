import express from 'express';
import EventsController from '../controllers/events';


const router = express.Router();

router.post('/', EventsController.createEvent)
    .get('/', EventsController.getAllEvents)
    .get('/:id', EventsController.getOneEvent)
    .patch('/:id', EventsController.updateEvent)
    .delete('/:id', EventsController.deleteEvent)

export = router;