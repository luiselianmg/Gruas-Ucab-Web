import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
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
  }