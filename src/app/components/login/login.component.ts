import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Credentials } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule, 
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
  })
  export class LoginComponent {

	userService = inject(UserService);
	router = inject(Router);

	invalidLogin = false;

	loginForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	})

	onSubmit() {
		const credentials = this.loginForm.value as Credentials;
		this.userService.loginUser(credentials).subscribe({
			next: (response) => {
				const {firstname, lastname, role, token} = response;
				console.log('Firstname:', firstname);
				console.log('Lastname:', lastname);
				console.log('Role:', role);
				console.log('JWT Token:', token);
				localStorage.setItem('authToken', token);
				localStorage.setItem('loggedInUser', JSON.stringify({ firstname, lastname, role }));


				this.userService.user.set({
					firstname: response.firstname,
					lastname: response.lastname,
					role: response.role
				})
				this.router.navigate([`home`])
			},
			error: (error) => {
				console.log('Login error', error);
				this.invalidLogin = true;
			}

		})
	}
}
