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

  patchExtraCost(orderId: string, costData: ExtraCostData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Datos enviados:', costData, 'id de la orden', orderId);

    return this.http
      .patch(`${this.apiUrl}/orders-ms/order/add-extra-costs/${orderId}`, costData, { headers })
  }
}
