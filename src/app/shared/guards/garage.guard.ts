import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

// Guard to restrict access to user's own garage
export const garageGuard: CanActivateFn = (route, state) => {
    
    // Inject necessary services (UserService for user state, Router for navigation)
    const userService = inject(UserService);
    const router = inject(Router);

    // Retrieve the currently authenticated user
    const loggedInUser = userService.user();

    // Extract the requested username from the route parameters
    const requestedUsername = route.params['username'];

    // Allow access if the logged-in user is accessing their own garage
    if (loggedInUser && loggedInUser.username === requestedUsername) {
        return true;
    }

    // Redirect unauthorized users to the home page
    router.navigate(['home']);
    return false;
};

