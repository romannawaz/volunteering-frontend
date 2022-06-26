import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(): boolean {
    const isLogged: boolean = localStorage.getItem('user') ? true : false;

    if (isLogged) {
      return true;
    }

    this.router.navigateByUrl('/auth');

    return false;
  }

}
