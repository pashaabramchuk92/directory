import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private auth: AuthService
  ) { }

  isAuth() {
    return this.auth.isAuthenticated();
  }

  logout() {
    localStorage.clear();
  }
}
