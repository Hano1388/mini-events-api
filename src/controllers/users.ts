import { Request, Response, NextFunction } from 'express';

import Auth from '../utils/auth';
import knex from '../db/client';
import { geocoder } from '../utils/geocoder';
import { generateError } from '../utils/generateError/index';

export = {
    createUser: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const user = req.body;
        // Do the validations here
        // get user by email to check if user exist
        const { first_name, last_name, email, password } = user;
        const userExist = await knex('users').where('email', email).first();
        if (!userExist) {
            try {
                let newUser;
                const hash = await Auth.hashPassword(password);

                if (user.address) {
                    // using geocoder to geocode a full formatted address,
                    //  latitude, and longitude from user entered address
                    //  I would prefer using a pre_save hook to generate 
                    //  geocoding fields from address. a package like 'knex-hooks'
                    //  or we can use an orm such as 'objection' or 'bookshelf'
                    const addressFields = await geocoder.geocode(user.address);
                    const { formattedAddress: address, latitude, longitude } = addressFields[0];
                    // then insert the user into DB
                    newUser = {
                        first_name,
                        last_name,
                        email,
                        password: hash,
                        address,
                        latitude,
                        longitude
                    }
                } else {
                    newUser = {
                        first_name,
                        last_name,
                        email,
                        password: hash,
                    }
                }

                const userId = await knex('users').insert(newUser, 'id');
                return res.json(userId[0]);
            } catch (error) {

                next(new Error(error));
            }
        }

        next(generateError('Email in use', 400));
    },
}
