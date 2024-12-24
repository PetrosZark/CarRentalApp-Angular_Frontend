import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CarModelService {
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCarModels(): Observable<{ id: number; carmodel: string; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; carmodel: string; brand: string }[]>(`${API_URL}/home/cars/models`, { headers });
  }

  createCarModel(model: { brandId: number; carmodel: string }): Observable<{ id: number; carmodel: string; brand: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ id: number; carmodel: string; brand: string }>(`${API_URL}/home/manage-entities/carmodels`, model,{ headers });
  }
  
  getBrands(): Observable<{ id: number; brand: string }[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ id: number; brand: string }[]>(`${API_URL}/home/cars/brands`, { headers });
  }
}


