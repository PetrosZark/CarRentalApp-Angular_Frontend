import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CarInsert, CarReadOnly, CarUpdate } from '../interfaces/car';
import { AuthService } from './auth-service';

// Base API URL from environment variables
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class GarageService {
    // Inject HttpClient for HTTP operations
    http: HttpClient = inject(HttpClient);
    
    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches the list of cars owned by the user (paginated).
     * @param page Page number for pagination (default: 0)
     * @param size Number of items per page (default: 5)
     * @returns Observable containing user cars and pagination details
     */
    getUserCars(page: number = 0, size: number = 5): Observable<{ content: CarReadOnly[]; totalElements: number; totalPages: number }> {
        const headers = this.authService.getAuthHeaders();
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<{ content: CarReadOnly[]; totalElements: number; totalPages: number }>(`${API_URL}/home/garage`, { headers, params });
    }

    /**
     * Adds a new car to the user's garage.
     * @param car Car details for insertion
     * @returns Observable of the operation result
     */
    addCar(car: CarInsert): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.post(`${API_URL}/home/garage`, car, { headers });
    }

    /**
     * Updates car details by car ID.
     * @param id Car ID to update
     * @param car Updated car details
     * @returns Observable of the operation result
     */
    updateCar(id: string, car: CarUpdate): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.put(`${API_URL}/home/garage/update/${id}`, car, { headers });
    }

    /**
     * Deletes a car from the user's garage by ID.
     * @param id Car ID to delete
     * @returns Observable of the operation result
     */
    deleteCar(id: string): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete(`${API_URL}/home/garage/delete/${id}`, { headers });
    }

    /**
     * Fetches a list of all cities where cars are available.
     * @returns Observable array of city objects
     */
    getCities(): Observable<{ id: number; city: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
    }

    /**
     * Fetches detailed information about a car by its ID.
     * @param id Car ID to fetch
     * @returns Observable containing car details
     */
    getCarById(id: string): Observable<CarReadOnly> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<CarReadOnly>(`${API_URL}/home/garage/${id}`, { headers });
    }

    /**
     * Fetches a list of all car brands.
     * @returns Observable array of brand objects
     */
    getBrands(): Observable<{ id: number; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
    }

    /**
     * Fetches a list of all available car models.
     * @returns Observable array of car model objects
     */
    getAllModels(): Observable<{ id: number; carmodel: string; brand: string }[]> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<{ id: number; carmodel: string; brand: string }[]>(`${API_URL}/home/cars/models`, { headers });
    }
}
