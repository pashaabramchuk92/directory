import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegistationComponent} from "./registation/registation.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  { path: '',
    component: MainPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
