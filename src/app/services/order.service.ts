import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { orderData } from '../domain/order.domain';
import { orderAllData } from '../domain/orderAll.domain';
import { conductorData } from '../domain/conductor.domain';
import { activeConductorData } from '../domain/activeConductor.domain';

interface conductorAux {
  providerId: string;
  conductorId: string;
  dni: number;
  name: string;
  location: string;
  image: string;
  craneId: string;
}

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

  patchOrder(orderId: string, patchData: { conductorAssignedId: string; totalDistance: number }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .patch(`${this.apiUrl}/orders-ms/order/assign-conductor/${orderId}`, patchData, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error al asignar conductor:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
          return throwError(error);
        })
      );
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

    // Conductores
    getConductors(): Observable<conductorData[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<conductorData[]>(`${this.apiUrl}/providers-ms/provider/conductors`, {
        headers,
      });
    }

    getConductorsActive(): Observable<activeConductorData[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<activeConductorData[]>(`${this.apiUrl}/providers-ms/provider/conductors`, {
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
  
    createConductor(conductor: conductorAux): Observable<conductorAux> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      console.log('Datos enviados:', conductor);
  
      return this.http
        .post<conductorAux>(`${this.apiUrl}/providers-ms/provider/conductors`, conductor, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al agregar conductor:', error);
            if (error.error && error.error.errors) {
              console.error('Validation errors:', error.error.errors);
            }
            return throwError(error);
          })
        );
    }

}
