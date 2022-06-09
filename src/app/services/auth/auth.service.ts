import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

// Services
import { WindowServiceInterface } from '../window/window.service.interface';
import { AuthServiceInterface } from './auth.service.interface';

// Interfaces
import { User, UserLoginData, UserRegistrationData } from './user.interface';
import { TokenData } from './token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

  private _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public readonly userObservable: Observable<User | null> = this._userSubject.asObservable();

  private readonly getUserEndpoint: string = `${this.windowService.endpointApi()}/auth/user`;
  private readonly signInEndpoint: string = `${this.windowService.endpointApi()}/auth/sign-in`;
  private readonly signUpEndpoint: string = `${this.windowService.endpointApi()}/auth/sign-up`;

  private readonly localStorageKeys: { [key: string]: string } = {
    user: 'user',
  };

  constructor(
    @Inject('WindowServiceInterface')
    private windowService: WindowServiceInterface,
    private route: Router,
    private http: HttpClient,
  ) {
    this._updateUserToken();
  }

  public get user(): User | null {
    return this._userSubject.getValue();
  }

  private set user(user: User | null) {
    this._userSubject.next(user);
  }

  public getCurrentUserPassword(): Observable<string> {
    return this.http
      .get<{ password: string }>(
        `${this.getUserEndpoint}/password/${this.user?._id}`
      )
      .pipe(
        map(({ password }) => password)
      );
  }

  public getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(
        `${this.getUserEndpoint}/${id}`
      );
  }

  public signIn(user: UserLoginData): Observable<string | null> {
    return this._modifyObservable(
      this.http
        .post<{ access_token: string }>(
          this.signInEndpoint,
          user
        )
    );
  }

  public createUser(user: UserRegistrationData): Observable<string> {
    return this._modifyObservable(
      this.http
        .post<string>(
          this.signUpEndpoint,
          user
        )
    );
  };

  public updateUser(userId: string, user: User): Observable<string> {
    const updateUserUrl: string = `${this.windowService.endpointApi()}/auth/update/${userId}`;

    return this._modifyObservable(
      this.http
        .put<{ access_token: string }>(
          updateUserUrl,
          user
        )
    );
  }

  public changePassword(userId: string, password: string): Observable<string> {
    const updateUserUrl: string = `${this.windowService.endpointApi()}/auth/update/${userId}`;

    return this._modifyObservable(
      this.http
        .put<User>(
          updateUserUrl,
          { password }
        )
    );
  }

  public updateContacts(userId: string, contacts: string[]) {
    const updateUserContactsUrl: string = `${this.windowService.endpointApi()}/auth/contacts/${userId}`;

    return this.http
      .post(updateUserContactsUrl, { contacts });
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.localStorageKeys.user, JSON.stringify(token));

    this._updateUserToken();
  }

  public logOut(): void {
    localStorage.removeItem(this.localStorageKeys.user);

    this.route.navigateByUrl('home');

    this.user = null;
  }

  private _modifyObservable(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      take(1),
      map((tokenObj: { access_token: string }) => tokenObj.access_token),
    );
  }

  private _updateUserToken(): void {
    const userToken: string | null = localStorage.getItem('user');

    if (userToken) {
      const decodedToken: TokenData = jwt_decode(userToken);

      this.user = decodedToken._doc;
    }
    else {
      this.logOut();
    }
  }

}
