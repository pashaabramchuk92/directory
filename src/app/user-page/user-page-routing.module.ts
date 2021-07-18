import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserPageComponent} from "./user-page.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

const routes: Routes = [
  {path: '', component: UserPageComponent, children: [
    {path: 'editing', component: UpdateUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
