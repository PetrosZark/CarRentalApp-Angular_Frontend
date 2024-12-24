import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class CarService {
  http: HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getBrands(): Observable<{ id: string; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: string; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
  }

  getCities(): Observable<{ id: string; city: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: string; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
  }

  getCars(filters: { brand?: string; city?: string; page?: number; pageSize?: number }): Observable<{
    data: any[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams();

    if (filters.brand) params = params.set('brand', filters.brand);
    if (filters.city) params = params.set('city', filters.city);
    if (filters.page !== undefined) params = params.set('page', filters.page.toString());
    if (filters.pageSize !== undefined) params = params.set('pageSize', filters.pageSize.toString());

    return this.http.get<{
      data: any[];
      totalElements: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    }>(`${API_URL}/home/cars`, { headers, params });
  }
}
