import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserReadOnly } from '../interfaces/user';

const API_URL = `${environment.apiUrl}/home/manage-entities/users`;

@Injectable({
providedIn: 'root',
})
export class ManageUserService {
    http: HttpClient = inject(HttpClient);

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getPaginatedUsers(params: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${API_URL}`, { headers, params });
    }

    toggleUserStatus(username: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.patch<any>(`${API_URL}/${username}/toggle-status`, null, { headers });
    }

    changeUserRole(username: string, role: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.patch<any>(`${API_URL}/${username}/change-role`, null, {
        headers,
        params: { role },
        });
    }

    deleteUser(username: string): Observable<void> {
        const headers = this.getAuthHeaders();
        return this.http.delete<void>(`${API_URL}/${username}`, { headers });
    }
}
