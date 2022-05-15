import { Observable } from "rxjs";

import { User, UserRegistrationData } from "./user.interface";

export interface AuthServiceInterface {
    signIn(user: { email: string, password: string }): Observable<User | null>;
    createUser(user: UserRegistrationData): Observable<User>;
    saveLoggedUser(user: User): void;
}