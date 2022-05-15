export interface UserRegistrationData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export type User = Omit<UserRegistrationData, 'password'> & { _id: string };