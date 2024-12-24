import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Credentials, UserInsert, UserReadOnly, LoggedInUser } from '../interfaces/user';
import { Router } from '@angular/router';

const API_URL = `${environment.apiUrl}`; 

@Injectable({
     providedIn: 'root'
})
export class UserService {
    http: HttpClient = inject(HttpClient)
    router = inject(Router);

    user = signal<LoggedInUser | null>(null)

    constructor(){
        const loggedInUser = localStorage.getItem('loggedInUser')
        if(loggedInUser) {
            const parsedUser: LoggedInUser = JSON.parse(loggedInUser);
            this.user.set({
                firstname: parsedUser.firstname,
                lastname: parsedUser.lastname,
                role: parsedUser.role
            })
        }
        effect(() => {
            if(this.user()){
                console.log('User logged in:', this.user()?.firstname, this.user()?.lastname, this.user()?.role);
            } else {
                console.log('No user logged in.')
            }

        })
    }

    registerUser(userInsert: UserInsert) {
        return this.http.post<UserReadOnly>(`${API_URL}/register`, userInsert)
    }  

    loginUser(credentials: Credentials) {
        return this.http.post<{ firstname: string, lastname: string, role: string, token: string }>
            (`${API_URL}/authenticate`, credentials);
    }

    logoutUser(){
        this.user.set(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['home']);
    }

    isAuthenticated(): boolean {
        return this.user() !== null;
    }

    hasRole(role: string): boolean {
        const currentUser = this.user();
        return currentUser?.role === role;
    }
}
