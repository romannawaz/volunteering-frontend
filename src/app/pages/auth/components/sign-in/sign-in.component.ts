import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';
import { User } from 'src/app/services/auth/user.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  public signInForm!: FormGroup;
  public controls!: { [key: string]: AbstractControl };

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._createForm();

    this.controls = {
      email: this.signInForm.controls['email'],
      password: this.signInForm.controls['password'],
    };

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public signIn(): void {
    const data: { email: string, password: string } = this.signInForm.value;

    this._subscription.add(
      this.authService.signIn(data)
        .subscribe((user: User | null) => {
          if (user) {
            this.authService.saveLoggedUser(user);

            this.router.navigateByUrl('/home');
          }
        })
    );

    this.signInForm.reset();
  }

  private _createForm(): FormGroup {
    return this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

}
