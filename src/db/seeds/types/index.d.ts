export type IUser = {
    id: number;
}

export type User = {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    password: string;
    avatar: string;
    created_at: Date;
}