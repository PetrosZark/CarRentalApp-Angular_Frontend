import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarModelService } from '../../shared/services/car-model.service';

@Component({
selector: 'app-car-models',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './car-models.component.html',
styleUrls: ['./car-models.component.css'],
})
export class CarModelsComponent implements OnInit {
    // Array to store car models fetched from the backend
    carModels: { id: number; carmodel: string; brand: string }[] = [];
    filteredCarModels: { id: number; carmodel: string; brand: string }[] = [];
    
    // List of brands for filtering and model creation
    brands: { id: number; brand: string }[] = [];
    
    // Stores the selected brand for filtering car models
    selectedBrand: string | null = null;

    // Controls visibility of the create model form
    showCreateModelForm = false;

    // State for success and error popups
    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false; 
    errorMessage = ''; 

    // Model object for creating a new car model
    newModel = {
        brandId: null as number | null,
        carmodel: '',
    };

    // Inject the CarModelService to handle API calls
    carModelService = inject(CarModelService) 

    // Lifecycle hook - Fetch car models and brands on component initialization
    ngOnInit(): void {
        this.fetchCarModels();
        this.fetchBrands();
    }

   /**
    * Fetches all car models from the backend.
    * Populates both carModels and filteredCarModels arrays.
    */
    fetchCarModels(): void {
        this.carModelService.getCarModels().subscribe({
        next: (models) => {
            this.carModels = models;
            this.filteredCarModels = models;
        },
        error: (err) => console.error('Error fetching car models:', err),
        });
    }

    /**
     * Fetches the list of available brands from the backend.
     */
    fetchBrands(): void {
        this.carModelService.getBrands().subscribe({
        next: (brands) => {
            this.brands = brands;
        },
        error: (err) => console.error('Error fetching brands:', err),
        });
    }

    /**
     * Filters car models by the selected brand.
     * If no brand is selected, show all car models.
     */
    filterByBrand(): void {
        if (this.selectedBrand) {
        this.filteredCarModels = this.carModels.filter(
            (model) => model.brand === this.selectedBrand
        );
        } else {
        this.filteredCarModels = this.carModels;
        }
    }

    /**
     * Toggles the visibility of the create model form.
     * Resets the form when closed.
     */
    toggleCreateModelForm(): void {
        this.showCreateModelForm = !this.showCreateModelForm;
        if (!this.showCreateModelForm) {
        this.newModel = { brandId: null, carmodel: '' }; 
        }
    }

    /**
     * Handles the submission of the create model form.
     * Validates input and sends the payload to the backend.
     */
    createModel(): void {
        // Basic validation to ensure brand and model name are provided
        if (this.newModel.brandId === null || !this.newModel.carmodel.trim()) {
            console.error('Brand and model name are required.');
            return;
        }

        const modelPayload = {
            brandId: this.newModel.brandId as number,
            carmodel: this.newModel.carmodel.trim(),
        };

        // Call the service to create a new car model
        this.carModelService.createCarModel(modelPayload).subscribe({
            next: (model) => {
                this.carModels.push(model);
                this.filterByBrand(); // Re-filter the list to reflect the new addition
                
                // Show success message and reset the form
                this.successMessage = `Car Model Created: ID ${model.id}, Name: ${model.carmodel}, Brand: ${model.brand}`;
                this.showSuccessPopup = true;

                this.resetCreateModelForm();
                this.toggleCreateModelForm();

                // Auto-hide the success popup after 10 seconds
                setTimeout(() => (this.showSuccessPopup = false), 10000);
            },
            error: (err) => {
                this.handleError(err.error?.description || 'Error creating car model.');
            },
        });
    }

    /**
     * Handles errors by displaying a popup with the error message.
     * Auto-hides after 10 seconds.
     */
    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;

        setTimeout(() => (this.showErrorPopup = false), 10000); 
    }

    /**
     * Resets the create model form to its initial state.
     */
    resetCreateModelForm(): void {
        this.newModel = { brandId: null, carmodel: '' };
    }
}
