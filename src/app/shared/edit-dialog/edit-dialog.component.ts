import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserBody} from "../interfaces";
import {HttpService} from "../services/http.service";
import {MatDialogConfig} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});
  userBody: UserBody | undefined;

  constructor(
    private httpService: HttpService,
    private config: MatDialogConfig,
  ) {
    console.log(config) }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      userName: new FormControl(''),
      job: new FormControl('')
    });
  }

  handleUpdateUser() {
    this.userBody = {
      userName: this.editForm.value.userName,
      job: this.editForm.value.job
    }

    this.httpService.updateUser(1, this.userBody)
      .subscribe(() => {
        console.log(`user with id _ updated`)
      });
  }

}
