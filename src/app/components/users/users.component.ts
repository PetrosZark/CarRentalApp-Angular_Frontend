import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageUserService } from '../../shared/services/manage-user.service';
import { UserReadOnly } from '../../shared/interfaces/user';

@Component({
selector: 'app-users',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './users.component.html',
styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {    
    // Stores user data and modal state
    users: UserReadOnly[] = [];
    selectedUser: UserReadOnly | null = null;
    showUserModal = false;
    showRoleModal = false;
    
    // Role selection for updating users
    selectedRole = 'USER';
    selectedUsername = '';

    // Filters and pagination
    filters = {
        searchQuery: '',
        filterType: 'username'  // Default to 'username'
    };
    
    currentPage = 0;
    totalPages = 0;

    // Popups for success and error feedback
    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false;
    errorMessage = '';

    // Inject ManageUserService to handle API calls
    manageUserService = inject(ManageUserService);

    /**
     * Lifecycle hook - fetches initial user data on component load.
     */
    ngOnInit(): void {
        this.fetchUsers();
    }

    /**
     * Fetch users with pagination and filtering.
     */
    fetchUsers(): void {
        const params: any = {
            page: this.currentPage,
            size: 10,
            searchQuery: this.filters.searchQuery || undefined,
            filterType: this.filters.filterType  // Pass filter type (username, email, vat)
        };

        this.manageUserService.getPaginatedUsers(params).subscribe({
            next: (response) => {
                this.users = response.data;
                this.totalPages = response.totalPages;
            },
            error: (err) => this.handleError(err.error?.description || 'Error fetching users'),
        });
    }

    /**
     * Toggles a user's active/inactive status.
     * @param username - The username of the user to toggle.
     */
    toggleStatus(username: string): void {
        this.manageUserService.toggleUserStatus(username).subscribe({
        next: (user) => {
            this.successMessage = `User status updated: ${user.username}`;
            this.showSuccessPopup = true;
            this.fetchUsers();
        },
        error: (err) => this.handleError(err.error?.description || 'Error updating user status'),
        });
    }

    /**
     * Opens the role update modal for the selected user.
     * @param username - The username of the user to modify.
     */
    changeRole(username: string): void {
        this.selectedUsername = username;
        this.selectedRole = 'SIMPLE_USER';  
        this.showRoleModal = true;
    }

    /**
     * Confirms and applies the role change.
     */
    confirmRoleChange(): void {
        if (!this.selectedRole) return;
    
        this.manageUserService.changeUserRole(this.selectedUsername, this.selectedRole).subscribe({
            next: (user) => {
                this.successMessage = `User role updated: ${user.username} is now ${user.role}`;
                this.showSuccessPopup = true;
                this.fetchUsers();
                this.closeRoleModal();
            },
            error: (err) => this.handleError(err.error?.description || 'Error updating user role'),
        });
    }

    /**
     * Closes the role modal and resets role selection.
     */
    closeRoleModal(): void {
        this.showRoleModal = false;
        this.selectedRole = '';
        this.selectedUsername = '';
    }

    /**
     * Deletes a user after confirmation.
     * @param username - The username of the user to delete.
     */
    deleteUser(username: string): void {
        if (!confirm('Are you sure you want to delete this user?')) return;

        this.manageUserService.deleteUser(username).subscribe({
            next: () => {
                this.successMessage = `User deleted successfully: ${username}`;
                this.showSuccessPopup = true;
                this.fetchUsers();
            },
            error: (err) => this.handleError(err.error?.description || 'Error deleting user'),
        });
    }

    /**
     * Displays user info in a modal.
     * @param user - The user to display.
     */
    showUserInfo(user: UserReadOnly): void {
        this.selectedUser = user;
        this.showUserModal = true;
    }

    /**
     * Returns an array of page numbers for pagination display.
     */
    get totalPagesArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }

    /**
     * Navigates to the selected page.
     * @param page - The page number to navigate to.
     */
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            this.fetchUsers();
        }
    }    

    /**
     * Applies search filters based on VAT or other query parameters.
     */
    applyFilters(): void {
        const params: any = {
            // Pass VAT directly
            vat: this.filters.searchQuery,  
            page: this.currentPage,
            size: 10
        };
    
        this.manageUserService.getPaginatedUsers(params).subscribe({
            next: (response) => {
                // Update to match API response
                this.users = response.data;  
                this.totalPages = response.totalPages;
                this.currentPage = response.currentPage;
            },
            error: (err) => this.handleError(err.error?.description || 'Error fetching users'),
        });
    }

     /**
     * Handles error display and auto-hides the error popup after 10 seconds.
     * @param message - The error message to display.
     */
    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;
        setTimeout(() => (this.showErrorPopup = false), 10000);
    }
}
