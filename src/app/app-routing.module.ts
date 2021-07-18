import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)},
  {path: 'users/:id', canActivate: [AuthGuard], loadChildren: () => import('./user-page/user-page.module')
      .then(m => m.UserPageModule)},
  {path: 'users', canActivate: [AuthGuard], component: MainPageComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
