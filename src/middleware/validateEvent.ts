import { Request, Response, NextFunction } from 'express';

import { generateError } from '../utils/generateError/index';
import { IEvent } from './types/index';

// We can use express-validator as well but here I am gonna write a simple 
// custom validation for events
export const validateEvent = (req: Request, res: Response, next: NextFunction): void => {
    const { title, description, address, date } = req.body;
    const err = <IEvent>{};
    const hasTitle = typeof title === "string" && title.trim() !== "";
    const hasDescription = typeof description === "string" && description.trim() !== "";
    const hasAddress = typeof address === "string" && address.trim() !== "";
    const hasDate = typeof date === "string" && date.trim() !== "";

    if (!hasTitle) err.title = "Title Required";
    if (!hasDescription) err.description = "Description Required";
    if (!hasAddress) err.address = "Address Required";
    if (!hasDate) err.date = "Date required";


    if (!hasTitle || !hasDescription || !hasAddress || !hasDate) {
        next(generateError(JSON.stringify(err), 400));
    } else {
        next();
    }
}