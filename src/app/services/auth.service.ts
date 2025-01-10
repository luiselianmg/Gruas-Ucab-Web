import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        console.log(response);
        console.log(response.user.role);
        if (response.token && response.user.name && response.user.role) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.user.name);
          localStorage.setItem('role', response.user.role);
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
    console.log('Log out successfully');
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
}
