import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageComponent } from "./user-page.component";
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserPageRoutingModule } from "./user-page-routing.module";
import { HttpService } from "../shared/services/http.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataService} from "../shared/services/user-data.service";

@NgModule({
  declarations: [
    UserPageComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpService, UserDataService]
})
export class UserPageModule { }
