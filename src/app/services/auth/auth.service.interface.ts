import { Observable } from "rxjs";

import { User, UserLoginData, UserRegistrationData } from "./user.interface";

export interface AuthServiceInterface {
    readonly userObservable: Observable<User | null>;

    get user(): User | null;

    getCurrentUserPassword(): Observable<string>;
    signIn(user: UserLoginData): Observable<string | null>;
    createUser(user: UserRegistrationData): Observable<string>;
    updateUser(userId: string, user: User): Observable<string>;
    changePassword(userId: string, password: string): Observable<string>;
    saveToken(token: string): void;

    logOut(): void;
}