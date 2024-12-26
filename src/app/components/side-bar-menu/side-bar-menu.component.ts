import { Component, inject, effect } from '@angular/core';
import { SideBarEntry } from '../../shared/interfaces/side-bar-entry';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-side-bar-menu',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-bar-menu.component.html',
    styleUrl: './side-bar-menu.component.css'
})
export class SideBarMenuComponent {
  
    // Inject UserService to access authentication and user role logic
    userService = inject(UserService); 

    // Menu items for the sidebar (filtered based on user state)
    menu: SideBarEntry[] = [];

    constructor() {
        effect(() => {
            // Reactive effect - Runs on component initialization and tracks changes
            this.initializeMenu();
        });
    }

    /**
     * Initializes the menu with visibility conditions.
     * Filters entries based on authentication and role checks.
     */
    initializeMenu(): void {
        this.menu = [
            { text: 'Search Cars', routerLink: 'search-cars', visible: this.userService.isAuthenticated() },
            { text: 'Garage', routerLink: 'garage', visible: true },
            { text: 'Entity Manager', routerLink: 'manage-entities', visible: this.userService.hasRole('SUPER_ADMIN') },
        ].filter(entry => entry.visible);
    }

    /**
     * Returns the user's authentication status.
     * Used for conditional rendering in the template.
     */
    isAuthenticated(): boolean {
        return this.userService.isAuthenticated();
    }
}

