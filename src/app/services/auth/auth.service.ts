import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { WindowServiceInterface } from '../window/window.service.interface';
import { AuthServiceInterface } from './auth.service.interface';

import { User, UserRegistrationData } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {

  private _isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedObservable: Observable<boolean> = this._isLoggedSubject.asObservable();

  private readonly localStorageKeys: { [key: string]: string } = {
    user: 'user',
  }

  constructor(
    @Inject('WindowServiceInterface')
    private windowService: WindowServiceInterface,
    private route: Router,
    private http: HttpClient,
  ) {
    const isLogged: boolean = localStorage.getItem('user') ? true : false;

    if (isLogged) {
      this.isLogged = isLogged;
    }
  }

  private set isLogged(isLogged: boolean) {
    this._isLoggedSubject.next(isLogged);
  }

  public signIn(user: { email: string, password: string }): Observable<User | null> {
    return this.http
      .post<User>(`${this.windowService.endpointApi()}/auth/sign-in`, user)
      .pipe(
        take(1)
      );
  }

  public getCurrentUser(): User {
    const localStorageUserData: string | null = localStorage.getItem('user');

    if (localStorageUserData) {
      return JSON.parse(localStorageUserData);
    }
    else {
      this.logOut();

      return {} as User;
    }
  }

  public createUser(user: UserRegistrationData): Observable<User> {
    return this.http
      .post<User>(`${this.windowService.endpointApi()}/auth/sign-up`, user);
  };

  public saveLoggedUser(user: User): void {
    localStorage.setItem(this.localStorageKeys.user, JSON.stringify(user));

    this.isLogged = true;
  }

  public logOut(): void {
    localStorage.removeItem(this.localStorageKeys.user);

    this.route.navigateByUrl('home');

    this.isLogged = false;
  }

}
