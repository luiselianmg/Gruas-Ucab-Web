import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { orderData } from '../domain/order.domain';
import { orderAllData } from '../domain/orderAll.domain';
import { conductorData } from '../domain/conductor.domain';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrders(): Observable<orderData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<orderData[]>(`${this.apiUrl}/orders-ms/order`, {
      headers,
    });
  }

  getOrdersAllData(): Observable<orderAllData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<orderAllData[]>(`${this.apiUrl}/orders-ms/order`, {
      headers,
    });
  }

  getConductors(): Observable<conductorData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<conductorData[]>(`${this.apiUrl}/providers-ms/provider/conductors`, {
      headers,
    });
  }

  getConductor(id: string): Observable<conductorData> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<conductorData>(`${this.apiUrl}/providers-ms/provider/conductors/conductor/${id}`, {
      headers,
    });
  }

  patchOrder(orderId: string, patchData: { conductorAssignedId: string; totalDistance: number }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/orders-ms/order/assign-conductor/${orderId}`, patchData, { headers });
  }

  createOrder(order: orderData): Observable<orderData> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Datos enviados:', order);

    return this.http
      .post<orderData>(`${this.apiUrl}/orders-ms/order`, order, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error al agregar al orden:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
          return throwError(error);
        })
      );
  }

}
