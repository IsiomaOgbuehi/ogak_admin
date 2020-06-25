import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (this.authService.isLoggedIn()) {
      //   this.router.navigate(['/dashboard']);
      // }
      // return !this.authService.isLoggedIn();
    return false;
  }

  // canActivate() {
  //   if (this.authService.isLoggedIn()) {
  //     this.router.navigate(['/dashboard']);
  //   }
  //   return !this.authService.isLoggedIn();
  //   // return true;
  // }
}
