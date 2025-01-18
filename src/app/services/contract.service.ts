import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ContractData } from '../domain/contract.domain';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getContracts(): Observable<ContractData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ContractData[]>(`${this.apiUrl}/orders-ms/contract`, {
      headers,
    });
  }
}
