import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserInsert, UserReadOnly } from '../interfaces/user';

const REGISTER_USER_URL = `${environment.apiUrl}/api/auth/register` 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http: HttpClient = inject(HttpClient)

  registerUser(userInsert: UserInsert) {
    return this.http.post<{registerResponse: UserReadOnly}>(`${REGISTER_USER_URL}`, userInsert)
  }

  
}
