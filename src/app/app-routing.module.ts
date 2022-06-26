import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(module => module.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(module => module.AuthModule),
  },
  {
    path: 'user-cabinet',
    loadChildren: () => import('./pages/user-cabinet/user-cabinet.module')
      .then(module => module.UserCabinetModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/product/product.module')
      .then(module => module.ProductModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
