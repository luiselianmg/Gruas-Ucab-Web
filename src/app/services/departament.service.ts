import { Injectable } from '@angular/core';
import { departmentData } from '../domain/department.domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiDepartmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDepartments(id?: string, name?: string): Observable<departmentData[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<departmentData[]>(
      `${this.apiUrl}/users-ms/department?id=${id}&name=${name}`,
      { headers }
    );
  }
}
