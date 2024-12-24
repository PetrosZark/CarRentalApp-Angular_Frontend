import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class CityService {
  http: HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCities(): Observable<{ id: number; city: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; city: string }[]>(`${API_URL}/home/cars/cities`, { headers });
  }

  createCity(city: { city: string }): Observable<{ id: number; city: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ id: number; city: string }>(`${API_URL}/home/manage-entities/cities`, city, { headers });
  }
}
