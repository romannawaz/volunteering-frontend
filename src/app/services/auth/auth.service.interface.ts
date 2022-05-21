import { Observable } from "rxjs";

import { User, UserRegistrationData } from "./user.interface";

export interface AuthServiceInterface {
    isLoggedObservable: Observable<boolean>;

    signIn(user: { email: string, password: string }): Observable<User | null>;
    getCurrentUser(): User;
    createUser(user: UserRegistrationData): Observable<User>;
    saveLoggedUser(user: User): void;

    logOut(): void;
}