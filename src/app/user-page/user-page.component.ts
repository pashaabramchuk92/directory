import {Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from "@angular/router";

import { HttpService } from "../shared/services/http.service";
import { environment } from "../../environments/environment";
import {UserModel} from "../shared/models/user.model";
import {UserDataService} from "../shared/services/user-data.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  path: string = environment.users;

  preloader: boolean = true;
  loading: boolean = false;

  id = this.route.snapshot.params.id;

  user: UserModel | undefined;

  constructor(
    private httpService: HttpService,
    private dataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpService.getUser(this.id).subscribe(response => {
      this.preloader = false;
      this.user = response.data;
    });
  };

  handleDelete() {
    this.loading = true;

    this.httpService.deleteUser(this.id).subscribe(() => {
      this.router.navigate([this.path]);
      this.loading = false;
    });

    this.httpService.getUsers();
  };

  handleClick() {
    this.dataService.setData(this.user);
  }
}
