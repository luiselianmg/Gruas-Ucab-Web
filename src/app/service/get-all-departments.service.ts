import { Injectable } from '@angular/core';
import { Department } from '../domain/department';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllDepartmentsService {
  private baseUrlDepartment = 'https://localhost:5050/api';
 
  constructor(private http: HttpClient) {}


  getAllDepartments( id: string, name: string): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.baseUrlDepartment}/department?id=${id}&name=${name}`
    );
  }

  

}
