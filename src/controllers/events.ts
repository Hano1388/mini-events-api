import { Request, Response, NextFunction } from 'express';

import { geocoder } from '../utils/geocoder';
import knex from '../db/client';
import { generateError } from '../utils/generateError/index';

export = {
    // TODO: Add user_signed_in? check, authorization, and validation middlewares
    // POST: /events
    createEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const event = req.body;
            const { title, description, date, address: addressString } = event;
            const user_id = req.signedCookies['user_id'];

            let newEvent;
            if (addressString) {
                const addressFields = await geocoder.geocode(addressString);
                const { formattedAddress: address, latitude, longitude } = addressFields[0];
                newEvent = {
                    title,
                    description,
                    date,
                    address,
                    latitude,
                    longitude,
                    user_id
                }
            } else {
                newEvent = {
                    title,
                    description,
                    date,
                    user_id
                }
            }

            const eventId = await knex('events').insert(newEvent, 'id');

            return res.json(eventId[0]);
        } catch (error) {
            next(error);
        }
    },

    // GET /events
    getAllEvents: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const events = await knex('events').orderBy('created_at', 'DESC');
            if (events) {
                return res.json(events)
            }

        } catch (error) {
            next(error);
        }
    },

    // GET /events/:id
    getOneEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id } = req.params;
            const event = await knex('events').where('id', id).first();
            if (event) {
                return res.json(event);
            }

        } catch (error) {
            next(error);
        }
    },

    // PATCH /events/:id
    updateEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {

            const { id } = req.params;
            const event = req.body;
            const { title, description, date, address: addressString } = event;
            let updatedEvent;

            if (addressString) {
                const addressFields = await geocoder.geocode(addressString);
                const { formattedAddress: address, latitude, longitude } = addressFields[0];
                updatedEvent = {
                    title,
                    description,
                    date,
                    address,
                    latitude,
                    longitude
                }
            } else {
                updatedEvent = {
                    title,
                    description,
                    date,
                }
            }

            const updatedEventId = await knex('events').where('id', id).update(updatedEvent, 'id');
            return res.json(updatedEventId[0]);

        } catch (error) {

            next(generateError('could not update the event', 302))
        }
    },

    // DELETE /events/:id
    deleteEvent: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id } = req.params;
            await knex('events')
                .where('id', id)
                .del();

            return res.json({ messsage: "Event deleted successfully" })
        } catch (error) {
            next(error)
        }
    }
}