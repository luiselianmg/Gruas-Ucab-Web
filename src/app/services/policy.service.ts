import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
