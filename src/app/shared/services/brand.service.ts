import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';

// Base API URL from environment variables
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class BrandService {
    // Inject HttpClient for making HTTP requests
    http: HttpClient = inject(HttpClient);

    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches the list of available car brands from the API.
     * @returns Observable array of brand objects { id, brand }
     */
    getBrands(): Observable<{ id: number; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
    }

    /**
     * Creates a new car brand by sending a POST request to the API.
     * @param brand Object containing the new brand name
     * @returns Observable of the created brand object { id, brand }
     */
    createBrand(brand: { brand: string }): Observable<{ id: number; brand: string }> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<{ id: number; brand: string }>(`${API_URL}/home/manage-entities/brands`, brand, { headers });
    }
}
