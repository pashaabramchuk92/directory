import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from "@angular/material/dialog";

import {HttpService} from "../shared/services/http.service";
import { Worker } from "../shared/interfaces";
import {CreateDialogComponent} from "../shared/create-dialog/create-dialog.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  title: string = 'Справочник сотрудников'

  workers: Worker[] | undefined;

  length: number = 0;
  pageSize: number = 0;
  currPage: number = 0;

  loadNextPage: boolean = false;

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.httpService.getWorkers(this.currPage + 1)
      .subscribe((response: any) => {
        console.log(response)
        this.workers = response.data;
        this.length = response.total;
        this.pageSize = response.per_page;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.loadNextPage = true;

    this.length = event.length;
    this.pageSize = event.pageSize;
    this.currPage = event.pageIndex;

    this.httpService.getWorkers(this.currPage + 1)
      .subscribe((response: any) => {
        this.workers = response.data;
        this.loadNextPage = false;
      });
  }

  openDialog() {
    this.dialog.open(CreateDialogComponent);
  }

}
