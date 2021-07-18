import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewUserModel} from "../../shared/models/new-user.model";
import {HttpService} from "../../shared/services/http.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {

  loading: boolean = false;

  form: FormGroup = new FormGroup({});
  newUser: NewUserModel | undefined;

  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) private data: number
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required])
    });
  };

  submit() {
    this.loading = true;

    if(this.form.invalid) {
      return;
    };

    this.newUser = {
      name: this.form.value.name,
      job: this.form.value.job
    };

    this.httpService.createUser(this.newUser).subscribe(response => {
      console.log(response);

      this.loading = false;
      this.form.reset();
    });

    this.httpService.getUsers(this.data);
  };

  get name() { return this.form.get('name') };
  get job() { return this.form.get('job') };
}
