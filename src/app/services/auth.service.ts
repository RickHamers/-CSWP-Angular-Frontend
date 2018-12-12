/*
    auth.service.ts
 */

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private httpclient: HttpClient
  ) {
    this.checkTokenExpiration();
  }

   createHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.returnToken()
    });
  }

  private saveCredentials(credentials) {
    localStorage.setItem('x-access-token', credentials.token);
    localStorage.setItem('expiresAt', credentials.expiresAt);
    localStorage.setItem('username', credentials.username);
    this.isLoggedIn$.next(true);
  }

  public logout() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
    this.isLoggedIn$.next(false);
  }

  private returnExpirationDate() {
    const expirationDate = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expirationDate);
    return moment(expiresAt);
  }

  private checkTokenExpiration() {
    const expired = moment().isBefore(this.returnExpirationDate());
    this.isLoggedIn$.next(expired);
    return expired;
  }

  private returnToken() {
    return localStorage.getItem('x-access-token') || '';
  }

  returnUsername() {
    return localStorage.getItem('username') || '';
  }

  login(username: string, password: string) {
    console.log('Login function');
    return this.httpclient.post(`${environment.apiUrl}/api/login`, {
      username: username,
      password: password
    },
      {headers: this.createHeader()}).pipe(
        tap(response => this.saveCredentials(response))
    );
  }

  register(username: string, password: string) {
    console.log('Register function');
    return this.httpclient.post(`${environment.apiUrl}/api/register`, {
        username: username,
        password: password
      },
      {headers: this.createHeader()}).pipe(
    );
  }

  get isLoggedIn() {
    return this.isLoggedIn$.asObservable();
  }
}
