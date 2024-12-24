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
    users: UserReadOnly[] = [];

    filters = {
        searchQuery: '',
        filterType: 'username'  // Default to 'username'
    };
    
    currentPage = 0;
    totalPages = 0;

    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false;
    errorMessage = '';

    manageUserService = inject(ManageUserService);

    ngOnInit(): void {
        this.fetchUsers();
    }

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

    changeRole(username: string): void {
        const role = prompt('Enter new role (ADMIN, USER):');
        if (!role) return;

        this.manageUserService.changeUserRole(username, role).subscribe({
        next: (user) => {
            this.successMessage = `User role updated: ${user.username} is now ${user.role}`;
            this.showSuccessPopup = true;
            this.fetchUsers();
        },
        error: (err) => this.handleError(err.error?.description || 'Error updating user role'),
        });
    }

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

    get totalPagesArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }


    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
        this.currentPage = page;
        this.fetchUsers();
        }
    }    

    applyFilters(): void {
        const params: any = {
            vat: this.filters.searchQuery,  // Pass VAT directly
            page: this.currentPage,
            size: 10
        };
    
        this.manageUserService.getPaginatedUsers(params).subscribe({
            next: (response) => {
                console.log("API Response:", response);  // Debugging
                this.users = response.data;  // Update to match API response
                this.totalPages = response.totalPages;
                this.currentPage = response.currentPage;
            },
            error: (err) => this.handleError(err.error?.description || 'Error fetching users'),
        });
    }


    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;
        setTimeout(() => (this.showErrorPopup = false), 10000);
    }
}
