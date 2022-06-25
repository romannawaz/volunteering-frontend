import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public contactsForm!: FormGroup;

  private userId!: string;

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this._createUserForm();
    this.changePasswordForm = this._createChangePasswordForm();
    this.contactsForm = this._createContactsForm();

    this.authService.userObservable.
      subscribe((user: User | null) => {
        if (user) {
          const { first_name, last_name, email, phone, cardNumber } = user;
          this.userForm.patchValue({ first_name, last_name, email });
          
          if (phone) {
            this.contactsForm.patchValue({ phone });
          }
          if (cardNumber) {
            this.contactsForm.patchValue({ cardNumber });
          }

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

  public updateContacts(): void {
    if (!this.contactsForm.valid) return;

    const { phone, cardNumber } = this.contactsForm.controls;

    this.authService.updateContacts(this.userId, phone.value, cardNumber.value)
      .subscribe((token: string) => {
        this.authService.saveToken(token);
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

  private _createContactsForm(): FormGroup {
    return this.formBuilder.group({
      phone: [''],
      cardNumber: ['', [Validators.minLength(16), Validators.maxLength(16)]],
    });
  }

}
