import { Injectable } from '@angular/core';
import { policyData } from '../domain/policy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiPolicyService {
  private apiUrl = 'https://localhost:5150';

  constructor(private http: HttpClient) {}

  getPolicy(): Observable<policyData[]> {
      return this.http.get<policyData[]>(`${this.apiUrl}/policy`
    );
  }

}