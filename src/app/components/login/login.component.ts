import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Credentials } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule, 
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		CommonModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	
	// Inject UserService and Router for API calls and navigation
	userService = inject(UserService);
	router = inject(Router);

	errorMessage: string = '';
	successMessage: string = '';
	showErrorPopup = false;
	showSuccessPopup = false;
	invalidLogin = false;

	// Reactive form with required validation for both fields
	loginForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	})

	/**
     * Handles form submission.
     * Calls login API and manages response or error.
     */
	onSubmit() {
		const credentials = this.loginForm.value as Credentials;
		
		// Handle login request and manage response
		this.userService.loginUser(credentials).subscribe({
			next: (response) => {
				const {firstname, lastname, role, token} = response;
				
				// Store JWT token and user info in localStorage
				localStorage.setItem('authToken', token);
				localStorage.setItem('loggedInUser', JSON.stringify({ firstname, lastname, role }));

				// Update global user state
				this.userService.user.set({
					firstname,
					lastname,
					role
				});

				// Navigate to home page after successful login
				this.router.navigate([`home`]);
				this.handleSuccess('Login successful');

			},
			error: (error) => {
				// Display error message if login fails
				const errorMessage = error.error?.description || error.error || 'Invalid username or password.';
				this.handleError(errorMessage);
			}	
		})
	}

	/**
     * Displays error popup with the provided message.
     * Auto-hides the popup after 10 seconds.
     */
	handleError(message: string): void {
		this.errorMessage = message;
		this.invalidLogin = true;
		this.showErrorPopup = true;
		setTimeout(() => (this.showErrorPopup = false), 10000);
	}

	/**
     * Displays success popup with the provided message.
     * Auto-hides the popup after 10 seconds.
     */
	handleSuccess(message: string): void {
		this.successMessage = message;
		this.showSuccessPopup = true;
		setTimeout(() => (this.showSuccessPopup = false), 10000);  
	}
}
