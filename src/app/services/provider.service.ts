import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { providerData } from '../domain/provider.domain';

@Injectable({
    providedIn: 'root',
  })
  export class ApiProviderService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private authService: AuthService) { }

    getProviders(): Observable<providerData[]> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<providerData[]>(`${this.apiUrl}/providers-ms/provider`, {
        headers,
      });
    }
  }