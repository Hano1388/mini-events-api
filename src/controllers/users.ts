import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/auth';
import knex from '../db/client';
import { UserId } from './types';
import { geocoder } from '../utils/geocoder';
import { Error } from '../types';
import { generateError } from '../utils/generateError/index';

export = {
    create: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const user = req.body;
        // Do the validations here
        // get user by email to check if user exist
        const userExist = await knex('users').where('email', user.email).first();
        if (!userExist) {
            try {
                // using geocoder to geocode a full formatted address,
                //  latitude, and longitude from user entered address
                //  I would prefer using a pre_save hook to generate 
                //  geocoding fields from address. a package like 'knex-hooks'
                //  or we can use an orm such as 'objection' or 'bookshelf'
                const addressFields = await geocoder.geocode(user.address);
                const { formattedAddress: address, latitude, longitude } = addressFields[0];
                const hash = await Auth.hashPassword(user.password);
                // then insert the user into DB
                const { first_name, last_name, email } = user;
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: hash,
                    address,
                    latitude,
                    longitude
                }

                const userId = await knex('users').insert(newUser, 'id').then((ids: UserId) => ids[0])
                return res.json({ id: userId });
            } catch (error) {
                next(new Error(error));
            }
        }

        next(generateError('Email in use', 400));
    },
}
