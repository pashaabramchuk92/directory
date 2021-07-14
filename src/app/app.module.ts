import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserPageComponent } from './user-page/user-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { CreateDialogComponent } from './shared/create-dialog/create-dialog.component'
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from "./shared/services/auth.service";
import {LoginComponent} from "./login/login.component";
import {RegistationComponent} from "./registation/registation.component";
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EditDialogComponent } from './shared/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistationComponent,
    MainPageComponent,
    NavigationComponent,
    UserPageComponent,
    CreateDialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [AuthService, MatDialogConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
