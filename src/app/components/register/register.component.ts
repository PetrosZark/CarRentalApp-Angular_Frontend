import { Component, inject } from '@angular/core';
import { 
    FormControl, 
    FormGroup, 
    ReactiveFormsModule, 
    Validators,
    AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../shared/services/user.service';
import { UserInsert } from '../../shared/interfaces/user';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule, 
        MatButtonModule, 
        MatSelectModule, 
        MatInputModule, 
        MatFormFieldModule,
        MatDatepickerModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
    })
    export class RegisterComponent {

        // Inject UserService for registration handling
        registerService = inject(UserService)

        // Tracks registration status to show success or error messages
        registrationStatus: {success: boolean, message: string} = {
            success: false,
            message: 'Not attempted yet.'
        }

        // Set age constraints for date of birth (18 to 80 years old)
        readonly maxDate = this.calculateDate(-18); // Latest selectable date (18 years ago)
        readonly minDate = this.calculateDate(-80); // Earliest selectable date (80 years ago)

        constructor(private router: Router) {}

        /**
         * Redirects to the login page after successful registration
         */
        redirectToLogin() {
            this.router.navigate(['/login']);
        }

        /**
         * Reloads the page to allow another registration attempt
         */
        registerAnother() {
            window.location.reload();
        }

        /**
         * Custom validator to check password and confirm password match
         */
        passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
            const form = control as FormGroup;
            const password = form.get('password')?.value;
            const confirmPassword = form.get('confirmPassword')?.value;

            if( password && confirmPassword && password!=confirmPassword) {
                form.get("confirmPassword")?.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            }
            return null
        }

        // Reactive form with validation rules for each field
        userForm = new FormGroup({
            firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}$')]),
            lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}$')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            vat: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
            phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,18}$')]),
            dateOfBirth: new FormControl('', Validators.required),
            gender : new FormControl('', Validators.required),
            username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{6,}$')]),
            password: new FormControl('', [
                Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%!^&*]).{8,}$')
            ]),
            confirmPassword: new FormControl('', [
                Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[@#$%!^&*]).{8,}$')
            ]),
        },
        { validators: this.passwordValidator }
        );

        /**
         * Lifecycle hook - formats date of birth to YYYY-MM-DD on selection
         */
        ngOnInit() {
            this.userForm.get('dateOfBirth')?.valueChanges.subscribe((value) => {
                if (value && typeof value === 'object' && 'toISOString' in value) {
                    const formattedDate = (value as Date).toISOString().split('T')[0];
                    this.userForm.get('dateOfBirth')?.setValue(formattedDate, { emitEvent: false });
                }
            });
        }

        /**
         * Helper method to calculate date offsets for min/max date
         */
        private calculateDate(yearsAgo: number): string {
            const date = new Date();
            date.setFullYear(date.getFullYear() + yearsAgo);
            return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        }

        /**
         * Handles form submission and calls the registration service
         */
        onSubmit(value: any) {
            console.log(value); 
            const user: UserInsert = {
                username: this.userForm.get('username')?.value || '',
                password: this.userForm.get('password')?.value || '',
                firstname: this.userForm.get('firstname')?.value || '',
                lastname: this.userForm.get('lastname')?.value || '',
                vat: this.userForm.get('vat')?.value || '',
                email: this.userForm.get('email')?.value || '',
                dateOfBirth: this.userForm.get('dateOfBirth')?.value || '',
                phone: this.userForm.get('phone')?.value || '',
                gender: this.userForm.get('gender')?.value || ''
            }

            this.registerService.registerUser(user).subscribe({
            next: (response) => {
                console.log("User registered successfully.", response);
                this.registrationStatus = {
                    success: true,
                    message: `<strong>User registered successfully:</strong><br>
                        <strong>Firstname:</strong> ${response.firstname}<br>
                        <strong>Lastname:</strong> ${response.lastname}<br>
                        <strong>Email:</strong> ${response.email}<br>
                        <strong>Phone number:</strong> ${response.phone}<br>
                        <strong>Username:</strong> ${response.username}<br>
                        <strong>Login with your username and password.</strong>`
                };
            },
            error: (error) => {
                console.log("Errors", error);
                this.registrationStatus = {
                    success: false,
                    message: error.error?.description || '<strong>Registration failed</strong>'
                };
            }
        });
    }
}
