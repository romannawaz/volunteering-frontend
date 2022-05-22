import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { WindowServiceInterface } from 'src/app/services/window/window.service.interface';
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

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

  public userData!: User;

  private updateUserUrl!: string;

  constructor(
    @Inject('WindowServiceInterface')
    private windowService: WindowServiceInterface,
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getCurrentUser();
    this.updateUserUrl = `${this.windowService.endpointApi()}/auth/update/${this.userData._id}`;

    this.userForm = this._createUserForm();
    this.changePasswordForm = this._createChangePasswordForm();

    const { first_name, last_name, email } = this.userData;
    this.userForm.setValue({ first_name, last_name, email });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updateUser(): void {
    if (!this.userForm.valid) return;

    this._subscription.add(
      this.http
        .put<User>(
          this.updateUserUrl,
          this.userForm.value
        )
        .subscribe((user: User) => {
          this.authService.saveLoggedUser(user);
        })
    );
  }

  public updatePassword(): void {
    if (!this.changePasswordForm.valid) return;

    const password: string = JSON.parse(localStorage.getItem('user')!).password;

    if (password != this.changePasswordForm.controls['current_password'].value) return;
    if (this.changePasswordForm.controls['password'].value != this.changePasswordForm.controls['repeated_password'].value) return;

    this._subscription.add(
      this.http
        .put<User>(
          this.updateUserUrl,
          { password: this.changePasswordForm.controls['password'].value }
        )
        .subscribe()
    );

    this.changePasswordForm.reset();
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
