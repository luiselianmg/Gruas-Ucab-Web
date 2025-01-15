import { Injectable } from '@angular/core';
import { userData } from '../domain/user.domain';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private apiUrl = 'https://localhost:5350';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(): Observable<userData[]> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<userData[]>(`${this.apiUrl}/user`, { headers }).pipe(
      catchError(error => {
        console.error('Error obteniendo los usuarios:', error);
        return throwError(error);
      })
    );
  }

  addUser(user: userData): Observable<userData> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<userData>(`${this.apiUrl}/user`, user, { headers }).pipe(
      catchError(error => {
        console.error('Error al agregar al usuario:', error);
        return throwError(error);
      })
    );
  }
}
