import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { contractData } from '../domain/contract.domain';

@Injectable({
    providedIn: 'root',
  })
  export class ApiContractService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private authService: AuthService) { }
  
    getContracts(): Observable<contractData[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<contractData[]>(`${this.apiUrl}/orders-ms/contract`, {
        headers,
      });
    }

    createContract(contract: contractData): Observable<contractData> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      console.log('Datos enviados:', contract);
  
      return this.http
        .post<contractData>(`${this.apiUrl}/orders-ms/contract`, contract, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al agregar contrato:', error);
            if (error.error && error.error.errors) {
              console.error('Validation errors:', error.error.errors);
            }
            return throwError(error);
          })
        );
    }
  }