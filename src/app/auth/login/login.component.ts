import { Component, OnInit } from '@angular/core';
import {SignInUserModel} from "../../shared/models/sign-in-user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  private user: SignInUserModel = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  };

  form: FormGroup = new FormGroup({})

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      password: new FormControl(this.user.password, [Validators.required])
    });
  }

  submit() {
    this.loading = true;

    if(this.form.invalid) {
      return;
    };

    const user: SignInUserModel = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.signIn(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
      this.loading = false;
    });
  }

  get email() { return this.form.get('email') };
  get password() { return this.form.get('password') };

}
