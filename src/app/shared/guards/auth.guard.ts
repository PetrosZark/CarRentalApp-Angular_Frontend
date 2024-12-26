import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { UserService } from '../services/user.service';

// Auth Guard to protect routes from unauthorized access
export const authGuard: CanActivateFn = (route, state) => {

    // Inject necessary services (UserService for user state, Router for navigation)
    const userService = inject(UserService);
    const router = inject(Router);

    // Check if user is authenticated by calling the userService
    if(userService.user()) {
        return true
    }

    // Redirect to login page if user is not authenticated
    router.navigate(['login']);
    
    // Deny access to the protected route
    return false;
};
