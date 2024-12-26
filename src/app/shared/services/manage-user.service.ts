import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';

// Base API URL for user management
const API_URL = `${environment.apiUrl}/home/manage-entities/users`;

@Injectable({
providedIn: 'root',
})
export class ManageUserService {
    // Inject HttpClient for HTTP operations
    http: HttpClient = inject(HttpClient);

    // Inject AuthService for handling authentication and headers
    authService = inject(AuthService);

    /**
     * Fetches paginated user data from the API.
     * @param params Query parameters for pagination and filtering
     * @returns Observable of paginated user data
     */  
    getPaginatedUsers(params: any): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.get<any>(`${API_URL}`, { headers, params });
    }

    /**
     * Toggles the active status of a user by username.
     * @param username Username of the user whose status will be toggled
     * @returns Observable of the operation result
     */
    toggleUserStatus(username: string): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.patch<any>(`${API_URL}/${username}/toggle-status`, null, { headers });
    }

    /**
     * Changes the role of a user by username.
     * @param username Username of the user whose role will be changed
     * @param role New role to assign to the user
     * @returns Observable of the operation result
     */
    changeUserRole(username: string, role: string): Observable<any> {
        const headers = this.authService.getAuthHeaders();
        return this.http.patch<any>(`${API_URL}/${username}/change-role`, null, {
            headers,
            params: { role },
        });
    }

    /**
     * Deletes a user by username.
     * @param username Username of the user to delete
     * @returns Observable indicating success or failure
     */
    deleteUser(username: string): Observable<void> {
        const headers = this.authService.getAuthHeaders();
        return this.http.delete<void>(`${API_URL}/${username}`, { headers });
    }
}
