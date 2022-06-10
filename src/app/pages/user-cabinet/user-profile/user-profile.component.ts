import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
          const { first_name, last_name, email, contacts } = user;
          this.userForm.setValue({ first_name, last_name, email });

          this._initContactsForm(contacts);

          this.userId = user._id;
        }
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get contacts(): FormArray {
    return this.contactsForm.controls['contacts'] as FormArray;
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

  public getContactFieldByIndex(index: number): FormControl {
    return this.contacts.controls[index] as FormControl;
  }

  public addNewContactField(value?: string): void {
    const contactsControls: AbstractControl[] = this.contacts.controls;

    if (!contactsControls[contactsControls.length - 1].value) {
      if (value) {
        contactsControls[contactsControls.length - 1].patchValue(value);
      };

      return;
    };

    this.contacts.push(this.formBuilder.control(value || null));
  }

  public updateContacts(): void {
    const { contacts }: { contacts: string[] } = this.contactsForm.value;
    const filteredContacts = contacts.filter((value: string) => value);

    this.authService.updateContacts(this.userId, filteredContacts)
      .subscribe((token: string) => {
        this.authService.saveToken(token);
      });
  }

  private _initContactsForm(contacts: string[]): void {
    contacts.forEach((contact: string, index: number) => {
      if (!(this.contacts.controls[index]?.value == contact)) {
        this.addNewContactField(contact);
      }
    })
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
      contacts: this.formBuilder.array([
        this.formBuilder.control(''),
      ])
    });
  }

}
