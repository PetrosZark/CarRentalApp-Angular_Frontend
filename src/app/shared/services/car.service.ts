import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';

// Base API URL from environment variables
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class CarService {
    
    // Inject HttpClient to enable HTTP requests
    http: HttpClient = inject(HttpClient);

    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches a list of car brands from the API.
     * @returns Observable array of brand objects { id, brand }
     */
    getBrands(): Observable<{ id: string; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: string; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
    }

    /**
     * Fetches a list of cities from the API where cars are available.
     * @returns Observable array of city objects { id, city }
     */
    getCities(): Observable<{ id: string; city: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: string; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
    }

    /**
     * Fetches a paginated list of cars based on optional filters.
     * @param filters Object containing optional filters (brand, city, page, pageSize)
     * @returns Observable containing car data, pagination details, and total counts
     */
    getCars(filters: { brand?: string; city?: string; page?: number; pageSize?: number }): Observable<{
        data: any[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    }> {
        const headers = this.authService.getAuthHeaders();
        let params = new HttpParams();

        // Apply filters dynamically (only add parameters if they are defined)
        if (filters.brand) params = params.set('brand', filters.brand);
        if (filters.city) params = params.set('city', filters.city);
        if (filters.page !== undefined) params = params.set('page', filters.page.toString());
        if (filters.pageSize !== undefined) params = params.set('pageSize', filters.pageSize.toString());

        // Perform GET request with headers and query parameters
        return this.http.get<{
            data: any[];
            totalElements: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        }>(`${API_URL}/home/cars`, { headers, params });
    }
}
