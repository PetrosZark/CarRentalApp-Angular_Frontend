import { Component, inject, OnInit } from '@angular/core';
import { GarageService } from '../../shared/services/garage.service';
import { CarInsert, CarReadOnly, CarUpdate } from '../../shared/interfaces/car';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-garage',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './garage.component.html',
    styleUrls: ['./garage.component.css'],
})
export class GarageComponent implements OnInit {
    // List of user's cars
    cars: CarReadOnly[] = [];

    // New car object for form binding
    newCar: CarInsert = this.initializeNewCar();
    
    // Car selected for updating
    selectedCar: CarReadOnly | null = null;

    // Selected car for image display modal
    selectedCarImage: CarReadOnly | null = null;

    // Image and associated car
    imageToUpload: File | null = null;
    carIdForUpload: string | null = null;

    // Dropdown lists for form inputs
    brands: { id: number; brand: string }[] = [];
    models: { id: number; carmodel: string; brand: string }[] = [];
    allModels: { id: number; carmodel: string; brand: string }[] = [];
    cities: { id: number; city: string }[] = [];

    // Pagination properties
    totalElements = 0;
    totalPages = 0;
    currentPage = 0;
    pageSize = 5;

    // Dependency Injection for GarageService
    garageService = inject(GarageService);

    // Popups for feedback messages
    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false; 
    errorMessage = '';

    // Lifecycle hook - Fetch data when component initializes
    ngOnInit(): void {
        this.fetchUserCars();
        this.fetchCities();
        this.fetchBrands();
        this.fetchModels();
    }

    /**
     * Fetches the user's cars from the backend with pagination.
     * @param page The page number to fetch.
     */
    fetchUserCars(page: number = 0): void {
        this.garageService.getUserCars(page, this.pageSize).subscribe({
            next: (response) => {
                this.cars = response.content;
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.currentPage = page;
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error fetching user cars';
                this.handleError(errorMessage);
            },
        });
    }
  
  
    /**
     * Fetches list of cities for dropdown selection.
     */
    fetchCities(): void {
        this.garageService.getCities().subscribe({
            next: (cities) => (this.cities = cities),
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error fetching cities';
                this.handleError(errorMessage);
            },
        });
    }
  
    /**
     * Fetches list of car brands for dropdown selection.
     */
    fetchBrands(): void {
        this.garageService.getBrands().subscribe({
            next: (brands) => {
                this.brands = brands;
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error fetching brands';
                this.handleError(errorMessage);
            },
        });
    }   
  

    /**
     * Fetches all car models and resets the models list.
     */
    fetchModels(): void {
        this.garageService.getAllModels().subscribe({
            next: (models) => {
                this.allModels = models;
                this.models = [];
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error fetching models';
                this.handleError(errorMessage);
            },
        });
    }
  
    /**
     * Initializes a new car object for form binding.
     */
    initializeNewCar(): CarInsert {
        return {
            year: '',
            mileage: '',
            licensePlate: '',
            brandId: '',
            carmodelId: '',
            cityId: '',
        };
    }

    /**
     * Submits the new car form to add a car.
     */
    addCar(): void {
        this.garageService.addCar(this.newCar).subscribe({
            next: (response) => {
                console.log('Car added successfully:', response);
                this.fetchUserCars(this.currentPage);
                this.newCar = this.initializeNewCar();
                this.handleSuccess('Car added successfully');
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error adding car';
                this.handleError(errorMessage);
            },
        });
    } 

    /**
     * Updates an existing car's details.
     */
    updateCar(): void {
        if (this.selectedCar) {
            const city = this.cities.find((city) => city.city === this.selectedCar?.city);
    
            if (!city) {
                this.handleError('Invalid city selected or city not found');
                return;
            }
        
            const updatePayload = {
                mileage: this.selectedCar.mileage,
                cityId: city.id,
                available: this.selectedCar.available,
            };
        
            this.garageService.updateCar(this.selectedCar.id, updatePayload).subscribe({
                next: (response) => {
                    console.log('Car updated successfully:', response);
                    this.fetchUserCars(this.currentPage);
                    this.selectedCar = null;
                    this.handleSuccess('Car updated successfully');
                },
                error: (err) => {
                    const errorMessage = err.error?.description || err.error?.message || 'Error updating car';
                    this.handleError(errorMessage);
                },
            });
        }
    }
  
    /**
     * Deletes a car by its ID.
     * @param id Car ID to delete.
     */
    deleteCar(id: string): void {
        this.garageService.deleteCar(id).subscribe({
        next: (response) => {
            console.log('Car deleted successfully:', response);
            this.fetchUserCars(this.currentPage);
            this.handleSuccess('Car deleted successfully');
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Error deleting car';
                this.handleError(errorMessage);
            },
        });
    }

    /**
     * Filters models based on selected brand.
     */
    onBrandChange(): void {
        if (this.newCar.brandId) {
            const selectedBrandName = this.brands.find((b) => b.id.toString() === this.newCar.brandId)?.brand;
    
            if (selectedBrandName) {
                this.models = this.allModels.filter((model) => model.brand === selectedBrandName);
            } else {
                this.models = [];
            }
        }
    }

    /**
     * Displays a success message in a popup.
     * @param message Success message to display.
     */
    handleSuccess(message: string): void {
        this.successMessage = message;
        this.showSuccessPopup = true;

        setTimeout(() => (this.showSuccessPopup = false), 10000); 
    }

    /**
     * Displays an error message in a popup.
     * @param message Error message to display.
     */
    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;

        setTimeout(() => (this.showErrorPopup = false), 10000); 
    }  

    /**
     * Opens a file input dialog to upload an image for the specified car.
     * 
     * Dynamically creates a hidden file input element and simulates a click to trigger the file selection.
     * Passes the selected file to the `onFileSelected` method for processing.
     * 
     * @param car - The car associated with the image upload.
     */
    triggerFileInput(car: CarReadOnly): void {
        // Dynamically create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';  
        
        // Handle file selection and pass it to the appropriate handler
        fileInput.onchange = (event: any) => this.onFileSelected(event, car);
        
        // Simulate a click on the hidden file input to trigger file selection
        fileInput.click();
    }
    
    /**
     * Handles the file input change event and uploads the selected image.
     * @param event - The file input change event
     * @param car - The car associated with the image upload
     */
    onFileSelected(event: Event, car: CarReadOnly): void {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            this.imageToUpload = target.files[0];
            this.carIdForUpload = car.id;
    
            this.uploadCarImage();
        }
    }
    
    /**
     * Uploads selected image to the backend.
     */
    uploadCarImage(): void {
        if (this.imageToUpload && this.carIdForUpload) {
            this.garageService.uploadCarImage(this.carIdForUpload, this.imageToUpload).subscribe({
                next: () => {
                    this.handleSuccess('Image uploaded successfully');
                    this.fetchUserCars(this.currentPage);  
                    this.imageToUpload = null;
                    this.carIdForUpload = null;
                },
                error: (err) => {
                    const errorMessage = err.error?.description || err.error?.message || 'Failed to upload image';
                    this.handleError(errorMessage);
                },
            });
        }
    }
    
    /**
     * Deletes an image for a specific car.
     */
    deleteCarImage(carId: string): void {
        this.garageService.deleteCarImage(carId).subscribe({
            next: () => {
                this.handleSuccess('Image deleted successfully');
                this.fetchUserCars(this.currentPage); 
            },
            error: (err) => {
                const errorMessage = err.error?.description || err.error?.message || 'Failed to delete image';
                this.handleError(errorMessage);
            },
        });
    }

    /**
     * Opens a modal to display the selected car's image.
     * @param car - The car whose image is to be viewed
     */
    openImageModal(car: CarReadOnly): void {
        this.selectedCarImage = car;
    }

    
    /**
     * Closes the image modal by resetting the selected image.
     */
    closeImageModal(): void {
        this.selectedCarImage = null;
    }
}
