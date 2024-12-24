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
  userService = inject(UserService); 

  menu: SideBarEntry[] = [];

  constructor() {
    effect(() => {
      this.initializeMenu();
    });
  }

  initializeMenu(): void {
    this.menu = [
      { text: 'Search Cars', routerLink: 'search-cars', visible: this.userService.isAuthenticated() },
      { text: 'Garage', routerLink: 'garage', visible: true },
      { text: 'Entity Manager', routerLink: 'manage-entities', visible: this.userService.hasRole('SUPER_ADMIN') },
    ].filter(entry => entry.visible);

  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }
}

