import { Injectable } from '@angular/core';
import { GC_AUTH_TOKEN, GC_USER_ID, USER_DATA } from '../constants';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { SIGNIN_USER_MUTATION } from '../graphql';
import {delay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;


  // 2
  private userId: string = null;

  // 3
  private isauthenticated = new BehaviorSubject(false);

  constructor(private router: Router) {
  }

  // 4
  // @ts-ignore
  get isAuthenticated(): Observable {
    return this.isauthenticated.asObservable();
  }
  // 5
  saveUserData(id: string, token: string, userData: any) {

    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    localStorage.setItem(USER_DATA, userData);
    this.setUserId(id);
    this.isLoggedIn = true;
  }

  // 6
  setUserId(id: string) {
    this.userId = id;

    this.isauthenticated.next(true);
  }
  // 7
  // logout() {
  //   localStorage.removeItem(GC_USER_ID);
  //   localStorage.removeItem(GC_AUTH_TOKEN);
  //   this.userId = null;
  //
  //   this.isauthenticated.next(false);
  // }
  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.userId = null;
    this.router.navigate(['/login']);
  }

  // 8
  autoLogin() {
    const id = localStorage.getItem(GC_USER_ID);

    if (id) {
      this.setUserId(id);
      this.router.navigate(['/dashboard']);
    }
  }

  // isLoggedIn() {
  //   return this.getJwtToken();
  // }
  //
  // getJwtToken() {
  //   return localStorage.getItem(GC_AUTH_TOKEN) !== null ? true : false;
  // }
}
