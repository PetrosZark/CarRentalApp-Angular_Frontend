import { Injectable, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    router = inject(Router);

    /**
     * Generate Authorization header with Bearer token.
     * Redirect to login if no token is found.
     */
    getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        if (!token) {
            this.router.navigate(['/login']);
            return new HttpHeaders();
        }
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
}