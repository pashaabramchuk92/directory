import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../shared/services/http.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private path: string = environment.loginPath;

  loading: boolean = false;

  form: FormGroup = new FormGroup({});
  passwordsGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.passwordsGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup | any) {
    return g.get('password').value === g.get('repeat').value
      ? null : {'mismatch': true};
  };

  submit() {
    this.loading = true;

    if(this.form.invalid || this.passwordsGroup.invalid) {
      return;
    }

    const password = [this.passwordsGroup.value.password, this.passwordsGroup.value.repeat]
      .reduce((pass, next) => pass = next, 0);

    const user = {
      email: this.form.value.email,
      password
    }

    this.httpService.registerUser(user).subscribe(() => {
      this.form.reset();
      this.passwordsGroup.reset();
      this.loading = false;
      this.router.navigate([`auth/${this.path}`]);
    });
  };

  get login() { return this.form.get('email') };
  get password() { return this.passwordsGroup };

}
