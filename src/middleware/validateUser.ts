import { Request, Response, NextFunction } from 'express';

import { generateError } from '../utils/generateError/index';
import { IUser } from './types/index';

// We can use express-validator as well but here I am gonna write a simple 
// custom validation for events
export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    const err = <IUser>{};
    const hasEmail = typeof email === "string" && email.trim() !== "";
    const hasPassword = typeof password === "string" && password.trim() !== "";

    if (!hasEmail) err.email = "Email Required";
    if (!hasPassword) err.password = "Password Required";


    if (!hasEmail || !hasPassword) {
        next(generateError(JSON.stringify(err), 400));
    } else {
        next();
    }
}