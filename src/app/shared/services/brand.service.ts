import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  http: HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getBrands(): Observable<{ id: number; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
  }

  createBrand(brand: { brand: string }): Observable<{ id: number; brand: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ id: number; brand: string }>(`${API_URL}/home/manage-entities/brands`, brand, { headers });
  }
}
