import { Injectable } from '@angular/core';
import { policyData } from '../domain/policy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiPolicyService {
  private apiUrl = 'https://localhost:5150';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPolicy(): Observable<policyData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<policyData[]>(`${this.apiUrl}/policy`, { headers });
  }
}