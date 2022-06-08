import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

// Interfaces
import { User } from 'src/app/services/auth/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  public userForm!: FormGroup;
  public changePasswordForm!: FormGroup;

  private userId!: string;

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this._createUserForm();
    this.changePasswordForm = this._createChangePasswordForm();

    this.authService.userObservable.
      subscribe((user: User | null) => {
        if (user) {
          const { first_name, last_name, email } = user;
          this.userForm.setValue({ first_name, last_name, email });

          this.userId = user._id;
        }
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updateUser(): void {
    if (!this.userForm.valid) return;

    this._subscription.add(
      this.authService
        .updateUser(
          this.userId,
          this.userForm.value
        )
        .subscribe((token: string) => {
          this.authService.saveToken(token);
        })
    );
  }

  public updatePassword(): void {
    if (!this.changePasswordForm.valid) return;
    if (this.changePasswordForm.controls['password'].value != this.changePasswordForm.controls['repeated_password'].value) return;

    this.authService.getCurrentUserPassword()
      .pipe(
        switchMap(currentPassword => {
          if (currentPassword != this.changePasswordForm.controls['current_password'].value) return of(null);

          return this.authService
            .changePassword(
              this.userId,
              this.changePasswordForm.controls['password'].value
            )
        })
      )
      .subscribe((token: string | null) => {
        if (token) {
          this.authService.saveToken(token);
        }

        this.changePasswordForm.reset();
      });
  }

  private _createUserForm(): FormGroup {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
    });
  }

  private _createChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      current_password: [''],
      password: [''],
      repeated_password: [''],
    });
  }

}
