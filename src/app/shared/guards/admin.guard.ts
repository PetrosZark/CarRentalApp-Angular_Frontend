import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';


// Admin Guard to restrict access to SUPER_ADMIN users only
export const adminGuard: CanActivateFn = (route, state) => {

    // Inject necessary services (UserService for role check, Router for navigation)
    const userService = inject(UserService);
    const router = inject(Router);

    // Check if the user exists and has SUPER_ADMIN role
    const user = userService.user();
    if (user && user.role === 'SUPER_ADMIN') {
        return true;  
    }

    // Redirect to home page if user lacks required permissions
    router.navigate(['home']);
    
    // Deny access to the protected route
    return false;
};
