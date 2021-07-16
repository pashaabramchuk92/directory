import {Component, Input, OnInit, Optional} from '@angular/core';
import { HttpService } from "../shared/services/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserBody, User } from "../shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MainPageComponent} from "../main-page/main-page.component";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  preloader: boolean = true;
  loading: boolean = false;

  id = this.route.snapshot.params.id;

  editForm: FormGroup = new FormGroup({});
  userBody: UserBody | undefined;

  user: User | undefined;

  isShow: boolean = false;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.httpService.getWorker(this.id).subscribe(response => {
      this.user = response.data;
      this.preloader = false;
    });

    this.editForm = new FormGroup({
      userName: new FormControl(''),
      job: new FormControl('')
      //@ts-ignore
    }, {validators: this.validateUpdateUser});

  }

  validateUpdateUser(g: FormGroup) {
    return (
      //@ts-ignore
      g.get('userName').value && g.get('userName').value.trim().length > 0 ||
      //@ts-ignore
      g.get('job').value && g.get('job').value.trim().length > 0 ? null : {'mismatch': true}
    );
  };

  openForm() {
    this.isShow = true;
  }

  closeForm() {
    this.isShow = false;
    this.editForm.reset();
  }

  handleDeleteUser() {
    this.loading = true;
    this.httpService.deleteUser(this.id).subscribe(() => {
      console.log(`user with id ${this.id} delete`)
      this.router.navigate(['/users']);
      this.loading = false;
    });

    this.httpService.getWorkers();
  }

  handleUpdateUser() {
    this.loading = true;

    this.userBody = {
      userName: this.editForm.value.userName,
      job: this.editForm.value.job
    }

    if(this.userBody.userName || this.userBody.job) {
      this.httpService.updateUser(this.id, this.userBody)
        .subscribe(() => {
          console.log(`user with id ${this.id} updated.`)
          this.editForm.reset();
          this.loading = false;
        });

      this.httpService.getWorker(this.id).subscribe(response => {
        this.user = response.data;
      });
    }
  }

}
