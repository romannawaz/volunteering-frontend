import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCabinetComponent } from './user-cabinet.component';

const routes: Routes = [
  { path: '', component: UserCabinetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCabinetRoutingModule { }
