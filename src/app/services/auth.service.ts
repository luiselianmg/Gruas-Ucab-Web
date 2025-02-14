import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/users-ms/auth/login`, { email, password })
      .pipe(
        map((response) => {
          console.log('Response from backend:', response);
          if (
            response.token &&
            response.user.name &&
            response.user.role &&
            response.user.userId
          ) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.user.name);
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('id', response.user.userId);
            console.log('Token stored in localStorage:', response.token);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  forgotPwd(email: string): Observable<boolean> {
    return this.http
      .patch<any>(`${this.apiUrl}/users-ms/auth/recover-password`, { email })
      .pipe(
        map((response) => {
          console.log('Response from backend:', response);
          if (response.success) {
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    console.log('Logout successfully');
    this.router.navigate(['/authentication/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('name');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('id');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}
