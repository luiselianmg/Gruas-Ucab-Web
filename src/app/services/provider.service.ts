import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { providerData } from '../domain/provider.domain';
import { userData } from '../domain/user.domain';

@Injectable({
    providedIn: 'root',
  })
  export class ApiProviderService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private authService: AuthService) { }

    getProviders(): Observable<providerData[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<providerData[]>(`${this.apiUrl}/providers-ms/provider`, {
        headers,
      });
    }

    createProvider(provider: providerData): Observable<providerData> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      console.log('Datos enviados:', provider);
  
      return this.http
        .post<providerData>(`${this.apiUrl}/providers-ms/provider`, provider, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al agregar proveedor:', error);
            if (error.error && error.error.errors) {
              console.error('Validation errors:', error.error.errors);
            }
            return throwError(error);
          })
        );
    }

    getUser(): Observable<userData[]> {
        const token = this.authService.getToken();
        if (!token) {
        return throwError('Token not found');
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http
        .get<userData[]>(`${this.apiUrl}/users-ms/user?limit=100`, { headers })
        .pipe(
            catchError((error) => {
            console.error('Error obteniendo los usuarios:', error);
            return throwError(error);
            })
        );
    }
}