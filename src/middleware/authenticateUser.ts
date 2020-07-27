import { Request, Response, NextFunction } from 'express';

import { generateError } from '../utils/generateError/index';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    if (req.signedCookies['user_id']) {
        next();
    } else {
        next(generateError('Please sign in or sign up first', 401))
    }
}