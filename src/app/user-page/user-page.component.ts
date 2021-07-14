import {Component, OnInit } from '@angular/core';
import {HttpService} from "../shared/services/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Worker} from "../shared/interfaces";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDialogComponent} from "../shared/edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  id = this.route.snapshot.params.id;

  user?: Worker;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.httpService.getWorker(this.id).subscribe(response => {
      this.user = response.data
    });
  }

  handleDeleteUser() {
    this.httpService.deleteUser(this.id).subscribe(() => {
      console.log(`user with id ${this.id} delete`)
      this.router.navigate(['/users']);
    });
  }

  openForm() {
    this.dialog.open(EditDialogComponent, {data: { id: this. id}})
  }
}
