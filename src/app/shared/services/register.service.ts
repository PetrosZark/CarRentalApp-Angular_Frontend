import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserInsert, UserReadOnly } from '../interfaces/user';

// API URL for user registration
const REGISTER_USER_URL = `${environment.apiUrl}/api/auth/register` 

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    // Inject HttpClient to handle HTTP operations
    http: HttpClient = inject(HttpClient)

    /**
     * Registers a new user by sending a POST request.
     * @param userInsert Data required to create a new user
     * @returns Observable containing the registered user's information
     */
    registerUser(userInsert: UserInsert) {
        return this.http.post<{registerResponse: UserReadOnly}>(`${REGISTER_USER_URL}`, userInsert)
    }  
}
