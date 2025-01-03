import { Injectable } from '@angular/core';
import { departmentData } from '../domain/department.domain';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDepartmentService {
  private apiUrl = 'https://localhost:5350';

  constructor(private http: HttpClient) {}

  getDepartments( id?: string, name?: string): Observable<departmentData[]> {
      return this.http.get<departmentData[]>(`${this.apiUrl}/department?id=${id}&name=${name}`
    );
  }
}