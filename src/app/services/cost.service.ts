// Servicio de Firebase no lo toquen

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
