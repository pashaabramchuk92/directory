import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../services/http.service";
import { UserBody } from "../interfaces";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  loading: boolean = false;

  addForm: FormGroup = new FormGroup({});
  userBody: UserBody | undefined;

  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required])
    });
  }

  handleCreateUser() {

    this.loading = true;

    if(this.addForm.invalid) {
      console.log('invalid')
    }

    this.userBody = {
      userName: this.addForm.value.userName,
      job: this.addForm.value.job
    }

    this.httpService.createUser(this.userBody).subscribe(() => {
      this.loading = false;
      this.addForm.reset();
    });

    this.httpService.getWorkers(this.data);

  }

  get userName() { return this.addForm.get('userName') }
  get job() { return this.addForm.get('job') }
}
