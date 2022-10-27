import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardAuthService implements CanActivate {

  // Initialization
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // Methods
  canActivate(): boolean {
    // if the user is not logged in properly, redirect to login
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
