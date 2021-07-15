import { Injectable } from "@angular/core";
import { User } from "../interfaces";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

const baseUrl = 'https://reqres.in/api';

@Injectable()
export class AuthService {

  get token(): any {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${baseUrl}/login`, user)
      .pipe(tap(this.setToken))
  }

  logout() {
    localStorage.clear()
  }

  isAuthenticated(): boolean | null {
    const token = localStorage.getItem('token');

    if(token) {
      return true
    }

    return null;
  }

  private setToken(response: any) {
    if(response.token) {
      localStorage.setItem('token', response.token)
    } else {
      localStorage.clear();
    }

  }

}
