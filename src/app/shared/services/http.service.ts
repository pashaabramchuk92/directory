import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

import { SignInUserModel } from "../models/sign-in-user.model";
import { NewUserModel } from "../models/new-user.model";

@Injectable()
export class HttpService {

  private baseUrl: string = environment.baseUrl;
  private path: string = environment.users;

  constructor(private http: HttpClient) { }

  registerUser(body: SignInUserModel) {
    return this.http.post(`${this.baseUrl}/${this.path}`, body);
  }

  getUsers(page?: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.path}?page=${page}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.path}/${id}`);
  }

  createUser(body: NewUserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.path}`, body)
  }

  updateUser(id: number, body: NewUserModel): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${this.path}/${id}`, body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.path}/${id}`);
  }
}
