import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/auth';
import knex from '../db/client';
import { generateError } from '../utils/generateError/index';

export = {
    createSession: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const user = req.body;
        // Do the validations here
        // get user by email
        const foundUser = await knex('users').where('email', user.email).first();
        if (foundUser) {
            const result = await Auth.compare(user.password, foundUser.password);
            if (result) {
                // making a simple cookie, using cookie-session would be
                // better if continue using cookies otherwise, tokens 
                // are a better choice
                const isSecure = req.app.get('env') !== 'development'; // works in production and HTTPsOnly
                res.cookie("user_id", foundUser.id, {
                    expires: new Date(Date.now() + 700000),
                    httpOnly: true,
                    secure: isSecure,
                    signed: true
                });

                return res.json({
                    message: "Successfully Sign In!"
                });
            } else {

                next(generateError('Incorrect Password', 400));
            }
        } else {

            next(generateError('Incorrect Email', 400));
        }
    },

    destroySession: async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        res.clearCookie('user_id');
        return res.json({ message: 'Signed Out' });
    }
}