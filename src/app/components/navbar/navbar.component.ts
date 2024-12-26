import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    // Inject UserService to manage user state and handle authentication
    userService = inject(UserService);
    
    // Reference to the current user observable or state
    user = this.userService.user


    /**
     * Calls UserService to log out the current user.
     * Typically clears user session and redirects to login page.
     */
    logout(){
    this.userService.logoutUser()
    }

}
