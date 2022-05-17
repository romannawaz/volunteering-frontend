import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject('AuthServiceInterface')
    public authService: AuthServiceInterface,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  public toSignUpPage(): void {
    this.router.navigateByUrl('/auth');
  }

}
