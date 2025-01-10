import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRoles = route.data['expectedRoles'];
    const userRole = this.authService.getRole();

    if (this.authService.isAuthenticated() && (!expectedRoles || expectedRoles.includes(userRole))) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }
}
