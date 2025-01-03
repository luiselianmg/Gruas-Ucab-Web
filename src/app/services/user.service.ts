import { Injectable } from '@angular/core';
import { userData } from '../domain/user.domain';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private apiUrl = 'https://localhost:5350';

  constructor(private http: HttpClient) {}

  getUser(): Observable<userData[]> {
      return this.http.get<userData[]>(`${this.apiUrl}/user`
    );
  }

  addUser(user: userData): Observable<userData> {
    return this.http.post<userData>(`${this.apiUrl}/user`, user);
  }
}