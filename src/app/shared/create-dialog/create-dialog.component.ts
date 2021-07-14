import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {User, UserBody} from "../interfaces";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});
  userBody: UserBody | undefined;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      userName: new FormControl(''),
      job: new FormControl('')
    })
  }

  handleCreateUser() {
    this.userBody = {
      userName: this.addForm.value.userName,
      job: this.addForm.value.job
    }

    this.httpService.createUser(this.userBody)
      .subscribe(response => {
        console.log(response)
      });
  }
}
