import { Request, Response, NextFunction } from 'express';

import knex from '../db/client';
import { generateError } from '../utils/generateError/index';

export const authorizeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const event = await knex('events').where('id', id).first();
    const user = await knex('users').where('id', req.signedCookies['user_id']).first();
    if (event && parseInt(event.user_id) === user.id || user.is_admin) {
        next();
    } else {
        next(generateError('Access Denied', 403))
    }
}
