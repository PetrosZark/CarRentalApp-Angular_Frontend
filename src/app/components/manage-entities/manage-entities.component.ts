import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-entities',
    standalone: true,
    imports: [],
    templateUrl: './manage-entities.component.html',
    styleUrl: './manage-entities.component.css'
})
export class ManageEntitiesComponent {

    // Inject Router to enable programmatic navigation
    router = inject(Router);

    /**
     * Navigates to the specified route when a button is clicked.
     * @param route - Path to navigate to (e.g., '/users', '/brands').
     */
    navigateTo(route: string): void {
        this.router.navigate([route]);
    }
}


