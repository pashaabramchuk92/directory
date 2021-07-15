import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registation/registration.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users/:id', component: UserPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
