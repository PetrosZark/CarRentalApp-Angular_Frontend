import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CarInsert, CarReadOnly, CarUpdate } from '../interfaces/car';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  http: HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserCars(page: number = 0, size: number = 5): Observable<{ content: CarReadOnly[]; totalElements: number; totalPages: number }> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ content: CarReadOnly[]; totalElements: number; totalPages: number }>(`${API_URL}/home/garage`, { headers, params });
  }

  addCar(car: CarInsert): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${API_URL}/home/garage`, car, { headers });
  }

  updateCar(id: string, car: CarUpdate): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${API_URL}/home/garage/update/${id}`, car, { headers });
  }

  deleteCar(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${API_URL}/home/garage/delete/${id}`, { headers });
  }

  getCities(): Observable<{ id: number; city: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
  }

  getCarById(id: string): Observable<CarReadOnly> {
    const headers = this.getAuthHeaders();
    return this.http.get<CarReadOnly>(`${API_URL}/home/garage/${id}`, { headers });
  }

  getBrands(): Observable<{ id: number; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
  }

  getAllModels(): Observable<{ id: number; carmodel: string; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; carmodel: string; brand: string }[]>(`${API_URL}/home/cars/models`, { headers });
  }
}
