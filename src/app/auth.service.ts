import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor( private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem("access_token");
  }

  readToken(): User {
    var accessToken = this.getToken();
    return helper.decodeToken(accessToken);
  }

  isAuthenticated(): boolean {
    var userToken = this.getToken();
    var valid = false;
    if (userToken) {
      valid = true;
    }
    return valid;
  }

  login(user: User): Observable<any> {
    var loginUrl = `${environment.userAPIBase}/login`;
    return this.http.post<any>(loginUrl, user);
  }

  logout(): void {
    localStorage.removeItem("access_token");
  }

  register(registerUser: RegisterUser): Observable<any> {
    var loginUrl = `${environment.userAPIBase}/register`;
    return this.http.post<any>(loginUrl, registerUser);
  }

}