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

    router = inject(Router);

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }
}


