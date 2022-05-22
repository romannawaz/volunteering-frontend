import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { UserCabinetComponent } from './user-cabinet.component';
import { ProductsComponent } from './products/products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '', component: UserCabinetComponent,
    children: [
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'products', component: ProductsComponent },
      { path: '**', redirectTo: 'user-profile' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCabinetRoutingModule { }
