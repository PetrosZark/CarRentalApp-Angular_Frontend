import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from "./components/footer/footer.component";
import { SideBarMenuComponent } from './components/side-bar-menu/side-bar-menu.component';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SideBarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carRentalApp';

  // Inject UserService to manage authentication and user-related operations
  userService = inject(UserService);

  /**
   * Checks if the user is authenticated by delegating to UserService.
   * This method is used to conditionally render parts of the UI (e.g., sidebar).
   * @returns boolean - True if the user is authenticated, otherwise false
   */
  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }
}
