import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';

// Base API URL from environment variables
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CarModelService {
    // Inject HttpClient to enable HTTP requests
    private http = inject(HttpClient);

    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches a list of all available car models.
     * @returns Observable array of car model objects { id, carmodel, brand }
     */
    getCarModels(): Observable<{ id: number; carmodel: string; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; carmodel: string; brand: string }[]>(`${API_URL}/home/cars/models`, { headers });
    }

    /**
     * Creates a new car model by sending a POST request to the API.
     * @param model Object containing brand ID and car model name
     * @returns Observable of the created car model { id, carmodel, brand }
     */
    createCarModel(model: { brandId: number; carmodel: string }): Observable<{ id: number; carmodel: string; brand: string }> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post<{ id: number; carmodel: string; brand: string }>(`${API_URL}/home/manage-entities/carmodels`, model,{ headers });
    }
    
    /**
     * Fetches a list of all car brands.
     * @returns Observable array of brand objects { id, brand }
     */
    getBrands(): Observable<{ id: number; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
    }
}


