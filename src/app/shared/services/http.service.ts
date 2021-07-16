import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UserLogin, UserBody} from "../interfaces";

const baseUrl = 'https://reqres.in/api/users';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getWorkers(page?: number): Observable<any> {
    return this.http.get(`${baseUrl}?page=${page}`);
  }

  getWorker(id: number): Observable<any> {
    const url = `${baseUrl}/${id}`;
    return this.http.get(url);
  }

  createUser(body: UserBody): Observable<any> {
    return this.http.post(baseUrl, body)
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }

  updateUser(id: any, body: UserBody): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, body)
  }

  registerUser(body: UserLogin) {
    return this.http.post(`${baseUrl}/register`, body);
  }
}
