import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../shared/services/brand.service';

@Component({
    selector: 'app-brands',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
    // Array to store list of brands fetched from the backend 
    brands: { id: number; brand: string }[] = []; 
    newBrand: string = ''; // Two-way bound to the input field for adding a new brand

    // Flags and messages for success/error popups
    showSuccessPopup = false; 
    successMessage = ''; 

    showErrorPopup = false; 
    errorMessage = ''; 

    // Inject the BrandService to handle API calls
    brandService =  inject(BrandService) 

    // Lifecycle hook - Fetch brands on component initialization
    ngOnInit(): void {
        this.fetchBrands();
    }

    /**
     * Fetches the list of brands from the backend and populates the table.
     */
    fetchBrands(): void {
        this.brandService.getBrands().subscribe({
            next: (brands) => {
                this.brands = brands;
            },
            error: (err) => console.error('Error fetching brands:', err),
    });
    }

    /**
     * Adds a new brand by sending the payload to the backend.
     * If successful, refreshes the list and displays a success message.
     */
    addBrand(): void {
        if (!this.newBrand.trim()) {
            console.error('Brand name is required.');
            return; // Prevent submission if the brand name is empty
        }

        const brandPayload = { brand: this.newBrand.trim() };

        this.brandService.createBrand(brandPayload).subscribe({
            next: (brand) => {
                this.brands.push(brand);
                this.fetchBrands(); // Refresh the list to ensure data consistency
            
                // Show success message and reset input
                this.successMessage = `Brand Created: ID ${brand.id}, Name: ${brand.brand}`;
                this.showSuccessPopup = true;

                this.newBrand = '';

                // Auto-hide success popup after 10 seconds
                setTimeout(() => (this.showSuccessPopup = false), 10000);
            },
            error: (err) => {
            this.handleError(err.error?.description || 'Error creating car model.');
        },
    });
    }

    /**
     * Handles errors by displaying a popup with the error message.
     * Auto-hides the error after 10 seconds.
     */
    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;

        setTimeout(() => (this.showErrorPopup = false), 10000); // Auto-hide after 5 seconds
    }
}
