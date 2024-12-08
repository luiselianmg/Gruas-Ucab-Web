import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, Role, User, UserBasicInfo } from '../domain/user';
import { Observable } from 'rxjs';
import { Department } from '../domain/department';

@Injectable({
  providedIn: 'root',
})
export class LocalserviceuserService {
  private baseUrl = 'http://localhost:3000';
  

  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData) {
    return this.http.post(`${this.baseUrl}/users`, postData);
  }

  getUserCredentials(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}`
    );
  }

  getUserBasicInfo(name: string, phone: string, role: Role, isActive: boolean): Observable<UserBasicInfo[]> {
    return this.http.get<UserBasicInfo[]>(
      `${this.baseUrl}/users?name=${name}&phone=${phone}&role=${role}&isActive=${isActive}`
    );
  }



}




