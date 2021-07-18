import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import {UserPageModule} from "./user-page/user-page.module";
import {AuthModule} from "./auth/auth.module";

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { UserItemComponent } from './main-page/user-item/user-item.component';
import { CreateNewUserComponent } from './main-page/create-new-user/create-new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    UserItemComponent,
    CreateNewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserPageModule,
    AuthModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [MatDialogConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
