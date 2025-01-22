import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

import { policyData } from '../domain/policy.domain';

@Injectable({
  providedIn: 'root',
})
export class ApiPolicyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPolicy(): Observable<policyData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<policyData[]>(`${this.apiUrl}/orders-ms/policy`, {
      headers,
    });
  }

  createPolicy(
    name: string,
    monetaryCoverage: number,
    kmCoverage: number,
    baseKmPrice: number
  ): Observable<boolean> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<boolean>(
        `${this.apiUrl}/orders-ms/policy`,
        {
          name,
          monetaryCoverage,
          kmCoverage,
          baseKmPrice,
        },
        { headers }
      )
      .pipe(
        map((response) => {
          console.log('Response from backend:', response);
          return true;
        }),
        catchError(() => of(false))
      );
  }
  
  updatePolicy(
    id: string,
    name?: string,
    monetaryCoverage?: number,
    kmCoverage?: number,
    baseKmPrice?: number
  ): Observable<boolean> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body: any = {
      name,
      monetaryCoverage,
      kmCoverage,
      baseKmPrice,
    };

    Object.keys(body).forEach(key => {
      if (body[key] === undefined || body[key] === null || body[key] === '') {
        delete body[key];
      }
    });

    console.log('Datos enviados en la solicitud PATCH:', body);
    return this.http
      .patch<boolean>(
        `${this.apiUrl}/orders-ms/policy/update/${id}`,
        body,
        { headers }
      )
      .pipe(
        map((response) => {
          console.log('Response from backend:', response);
          return true;
        }),
        catchError((error) => {
          console.error('Error en la solicitud PATCH:', error);
          return of(false);
        })
      );
  }
}
