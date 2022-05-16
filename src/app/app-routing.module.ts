import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(module => module.HomeModule),
    canActivate: [HomeGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(module => module.AuthModule),
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
