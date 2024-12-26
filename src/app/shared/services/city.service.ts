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
export class CityService {
    // Inject HttpClient for HTTP operations
    http: HttpClient = inject(HttpClient);

    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches a list of cities from the API.
     * @returns Observable array of city objects { id, city }
     */
    getCities(): Observable<{ id: number; city: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
    }

    /**
     * Creates a new city by sending a POST request to the API.
     * @param city Object containing the city name to be created
     * @returns Observable of the created city { id, city }
     */
    createCity(city: { city: string }): Observable<{ id: number; city: string }> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<{ id: number; city: string }>(`${API_URL}/home/manage-entities/cities`, city, { headers });
    }
}
