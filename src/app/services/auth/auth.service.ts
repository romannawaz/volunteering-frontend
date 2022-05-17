import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

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
    private http: HttpClient,
  ) {
    const isLogged: boolean = localStorage.getItem('user') ? true : false;
   
    this._isLoggedSubject.next(isLogged);
  }

  public signIn(user: { email: string, password: string }): Observable<User | null> {
    return this.http
      .post<User>(`${this.windowService.endpointApi()}/auth/sign-in`, user)
      .pipe(
        take(1)
      );
  }

  public createUser(user: UserRegistrationData): Observable<User> {
    return this.http
      .post<User>(`${this.windowService.endpointApi()}/auth/sign-up`, user);
  };

  public saveLoggedUser(user: User): void {
    localStorage.setItem(this.localStorageKeys.user, JSON.stringify(user));

    this._isLoggedSubject.next(true);
  }

}
