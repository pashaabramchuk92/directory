import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  user: User = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  };

  form: FormGroup = new FormGroup({});

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {

    this.loading = true;

    if(this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/']);
      this.loading = false;
    });
  }

}
