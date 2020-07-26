import { Error } from '../../types';

export const generateError = (message: string, status: number): Error => {
    const error: Error = new Error(message);
    error.status = status;
    return error;
}