import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.authService.userObservable
        .subscribe(isLogged => {
          if (isLogged) {
            this.router.navigateByUrl('/home');
          }
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
