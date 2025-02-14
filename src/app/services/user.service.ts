import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { userData } from '../domain/user.domain';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<userData[]> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError('Token not found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<userData[]>(`${this.apiUrl}/users-ms/user`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error obteniendo los usuarios:', error);
          return throwError(error);
        })
      );
  }

  addUser(user: userData): Observable<userData> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Datos enviados:', user);

    return this.http
      .post<userData>(`${this.apiUrl}/users-ms/user`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al agregar al usuario:', error);
          return throwError(error);
        })
      );
  }

  patchUserStatus(userId: string, patchData: Partial<userData>): Observable<userData> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<userData>(`${this.apiUrl}/users-ms/user/${userId}`, patchData, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el estado del usuario:', error);
          return throwError(error);
        })
      );
  }

}
