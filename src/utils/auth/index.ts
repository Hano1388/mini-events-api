import bcrypt from 'bcrypt';
const SALT_ROUNDS: number = 10;

export default class Auth {
    public static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS)
            .then((hash: string) => {
                return hash;
            })
    }

    public static compare(password: string, hash: string): Promise<Error | boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (error: Error | null, match: boolean | null) => {
                if (error) {
                    reject(error);
                }
                resolve(match);
            })
        })
    }
}