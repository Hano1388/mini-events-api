import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import { Error } from './types';
import usersRouter from './routes/users';

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// M I D D L E W A R E
app.use(logger('dev'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// multer middleware is required to support 'multipart/form-data'
// which is used by any fetch request made with a 'FormData' body
app.use(multer().none());

// R O U T E S
app.get('/', (req: Request, res: Response) => {
    res.send('Hi There! 🙌 Welcome to My API');
});

app.use('/api/v1/users', usersRouter);


// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err: Error = new Error('Not Found')
    err.status = 404;
    next(err);
});

// error handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
        .json({
            // error: req.app.get('env') === 'development' ? err : {},
            error: {
                status: err.status || 500,
                message: err.message || 'Internal Server Error',
            }
        })
});

export default app;
