import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

 

  /*getAllUserDetails(fullName: string,email: string, rol: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?fullname=${fullName}&email=${email}&rol=${rol}`
    );
  }*/

    listsUsers(){
      return this.http.get<User[]>(this.apiUrl);
    }
}
