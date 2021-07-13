import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isShow: any = this.auth.isAuthenticated

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
