import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { User } from "../shared/interfaces";
import {HttpService} from "../shared/services/http.service";

@Component({
  selector: 'app-registation',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loading: boolean = false;

  signUpForm: FormGroup = new FormGroup({});
  passwords: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    });

    this.passwords = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat: new FormControl('', [Validators.required, Validators.minLength(6)])
      //@ts-ignore
    }, {validators: this.passwordMatchValidator});

  }

  passwordMatchValidator(g: FormGroup) {
    //@ts-ignore
    return g.get('password').value === g.get('repeat').value
      ? null : {'mismatch': true};
  };

  submit() {

    this.loading = true;

    if(this.signUpForm.invalid || this.passwords.invalid) {
      return
    }

    const password = [this.passwords.value.password, this.passwords.value.repeat]
      .reduce((pass, next) => pass = next, 0);

    const user = {
      email: this.signUpForm.value.email,
      password: password
    }

    this.httpService.registerUser(user).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
      this.loading = false;
    });

    // this.signUpForm.reset();
    // this.passwords.reset();
  };

}
