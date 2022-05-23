import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

// Interfaces
import { UserRegistrationData } from 'src/app/services/auth/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public singUpForm!: FormGroup;
  public controls!: { [key: string]: AbstractControl };

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.singUpForm = this._createForm();

    this.controls = {
      first_name: this.singUpForm.controls['first_name'],
      last_name: this.singUpForm.controls['last_name'],
      email: this.singUpForm.controls['email'],
      password: this.singUpForm.controls['password'],
    };
  }

  public createUser(): void {
    const newUser: UserRegistrationData = this.singUpForm.value;

    this.authService.createUser(newUser)
      .subscribe((token: string) => {
        this.authService.saveToken(token);

        this.router.navigateByUrl('/home');
      });

    this.singUpForm.reset();
  }

  private _createForm(): FormGroup {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
    });
  }
}
