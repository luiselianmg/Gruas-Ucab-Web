import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { craneData } from '../domain/crane.domain';

@Injectable({
    providedIn: 'root',
  })
export class ApiCraneService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private authService: AuthService) { }

    getCranes(): Observable<craneData[]> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<craneData[]>(`${this.apiUrl}/providers-ms/cranes`, {
            headers,
          });
    }
    
    createCrane(crane: craneData): Observable<craneData> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      console.log('Datos enviados:', crane);
  
      return this.http
        .post<craneData>(`${this.apiUrl}/providers-ms/provider/cranes`, crane, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al agregar grua:', error);
            if (error.error && error.error.errors) {
              console.error('Validation errors:', error.error.errors);
            }
            return throwError(error);
          })
        );
    }

}
