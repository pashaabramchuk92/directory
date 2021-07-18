import { Component, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";

import { HttpService } from "../shared/services/http.service";
import { UserModel } from "../shared/models/user.model";
import {CreateNewUserComponent} from "./create-new-user/create-new-user.component";
import {MatDialog} from "@angular/material/dialog";
import {UserDataService} from "../shared/services/user-data.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  title: string = 'Справочник сотрудников';
  loading: boolean = false;

  users: UserModel[] | undefined;

  page: number = 1;
  pageSize: number = 0;
  length: number = 0;

  constructor(
    private httpService: HttpService,
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
    this.httpService.getUsers(this.page).subscribe(response => {
      this.users = response.data;
      this.pageSize = response.per_page;
      this.length = response.total;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.loading = true;

    this.length = event.length;
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;

    this.httpService.getUsers(this.page + 1).subscribe(response => {
      this.users = response.data;
      this.loading = false;
    });
  };

  openModal() {
    this.modal.open(CreateNewUserComponent, {
      data: { page: this.page }
    });
  }

}
