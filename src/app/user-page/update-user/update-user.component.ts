import {Component, Input, OnInit} from '@angular/core';
import {NewUserModel} from "../../shared/models/new-user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../shared/services/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDataService} from "../../shared/services/user-data.service";
import {UserModel} from "../../shared/models/user.model";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  user: UserModel | undefined;

  loading: boolean = false;

  form: FormGroup = new FormGroup({});
  updatedUser: NewUserModel | undefined;

  id: number = this.route.parent?.snapshot.params.id

  constructor(
    private httpService: HttpService,
    private dataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.dataService.getData();
    this.form = new FormGroup({
      name: new FormControl(
        (this.user?.first_name && this.user?.last_name)
          ? `${this.user.first_name} ${this.user.last_name}`
          : '', [this.noWhiteSpace]),
      job: new FormControl('', [this.noWhiteSpace])
    });
  }

  noWhiteSpace(c: FormControl | any) {
    return !((c.value).trim().length === 0) ? null : { 'whitespace': true }
  };

  close() {
    this.router.navigate([`users/${this.id}`]);
  }

  handleUpdate() {
    this.loading = true;

    this.updatedUser = {
      name: this.form.value.name,
      job: this.form.value.job
    };

    if(this.updatedUser.name || this.updatedUser.job) {
      this.httpService.updateUser(this.id, this.updatedUser).subscribe(() => {
        this.loading = false;

        this.form.reset();
      });
    }

    this.httpService.getUser(this.id).subscribe(response => {
      this.user = response.data;
    });
  }

  get name() { return this.form.get('name') };
  get job() { return this.form.get('job') };

}
