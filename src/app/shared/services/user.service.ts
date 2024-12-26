import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Credentials, UserInsert, UserReadOnly, LoggedInUser } from '../interfaces/user';
import { Router } from '@angular/router';

// Base API URL from environment variables
const API_URL = `${environment.apiUrl}`; 

@Injectable({
     providedIn: 'root'
})
export class UserService {
    // Inject HttpClient for making HTTP requests to the API
    http: HttpClient = inject(HttpClient);
    
    // Inject Router to handle redirection (e.g., after login or logout)
    router = inject(Router);

    // Signal to manage and track the logged-in user state
    user = signal<LoggedInUser | null>(null);

    // Constructor to initialize the service and restore user session (if available)
    constructor(){
        const loggedInUser = localStorage.getItem('loggedInUser')
        if(loggedInUser) {
            // Parse the user from local storage and set it in the signal
            const parsedUser: LoggedInUser = JSON.parse(loggedInUser);
            this.user.set({
                id: parsedUser.username,
                username: parsedUser.username,
                firstname: parsedUser.firstname,
                lastname: parsedUser.lastname,
                role: parsedUser.role
            })
        }
    }

    /**
     * Registers a new user by sending their details to the backend.
     * @param userInsert User data to register
     * @returns Observable containing the registered user's data
     */
    registerUser(userInsert: UserInsert) {
        return this.http.post<UserReadOnly>(`${API_URL}/register`, userInsert)
    }  

    /**
     * Authenticates the user by sending credentials (username/password).
     * @param credentials User's login credentials
     * @returns Observable containing user data, role, and JWT token
     */
    loginUser(credentials: Credentials) {
        return this.http.post<{ firstname: string, lastname: string, role: string, token: string }>
            (`${API_URL}/authenticate`, credentials);
    }

    /**
     * Logs out the current user by clearing session data from local storage.
     * Navigates the user to the home page after logout.
     */
    logoutUser(){
        this.user.set(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['home']);
    }

    /**
     * Checks if the user is authenticated (logged in).
     * @returns boolean - True if user is logged in, otherwise false
     */
    isAuthenticated(): boolean {
        return this.user() !== null;
    }

    /**
     * Checks if the logged-in user has a specific role.
     * @param role The role to check against
     * @returns boolean - True if the user has the specified role
     */
    hasRole(role: string): boolean {
        const currentUser = this.user();
        return currentUser?.role === role;
    }
}
