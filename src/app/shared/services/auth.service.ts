import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignInUserModel} from "../models/sign-in-user.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  baseUrl: string = environment.baseUrl;
  path: string = environment.loginPath

  constructor(private http: HttpClient) { }

  signIn(user: SignInUserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.path}`, user)
      .pipe(tap(this.setToken));
  }

  private setToken(response: any) {
    if(response.token) {
      localStorage.setItem('token', response.token)
    }
  }

  isAuthenticated(): boolean | null {
    const token = localStorage.getItem('token');

    if(token) {
      return true;
    }

    return null;
  }
}
