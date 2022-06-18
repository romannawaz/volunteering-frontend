import { Component, Inject, OnInit } from '@angular/core';
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {

  constructor(
    @Inject('AuthServiceInterface')
    public authService: AuthServiceInterface
  ) { }

  ngOnInit(): void {
  }

}
