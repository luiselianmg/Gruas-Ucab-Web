// Servicio de Firebase no lo toquen

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

import { ExtraCostData } from '../domain/extra-cost.domain';

@Injectable({
  providedIn: 'root',
})
export class CostsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCosts(): Observable<ExtraCostData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ExtraCostData[]>(
      `${this.apiUrl}/orders-ms/extra-cost`,
      {
        headers,
      }
    );
  }

  createCost(description: string, defaultPrice: number): Observable<boolean> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<boolean>(
        `${this.apiUrl}/orders-ms/extra-cost`,
        { description, defaultPrice },
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

  patchExtraCost(
    orderId: string,
    description: string,
    id: string,
    price: number
  ): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body: any = {
      extraCosts: [
        {
          description,
          id,
          price,
        }
      ]
    };
    console.log('Datos enviados en la solicitud PATCH:', body);
    return this.http
      .patch<any>(`${this.apiUrl}/orders-ms/order/add-extra-costs/${orderId}`, body, { headers })
      .pipe(
        map((response) => {
          console.log('Response from backend:', response);
          return true;
        }),
        catchError((error) => {
          console.error('Error en la solicitud PATCH:', error);
          if (error.error && error.error.errors) {
            console.error('Errores de validación:', error.error.errors);
          }
          return of(false);
        })
      );
  }

  updateCost(
    id: string,
    description?: string,
    defaultPrice?: number
  ): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body: any = {
      description,
      defaultPrice,
    };

    Object.keys(body).forEach((key) => {
      if (body[key] === undefined || body[key] === null || body[key] === '') {
        delete body[key];
      }
    });

    console.log('Datos enviados en la solicitud PATCH:', body);
    return this.http
      .patch<boolean>(`${this.apiUrl}/orders-ms/extra-cost/update/${id}`, body, { headers })
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

