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
    cars: CarReadOnly[] = [];
    newCar: CarInsert = this.initializeNewCar();
    selectedCar: CarReadOnly | null = null;

    brands: { id: number; brand: string }[] = [];
    models: { id: number; carmodel: string; brand: string }[] = [];
    allModels: { id: number; carmodel: string; brand: string }[] = [];
    cities: { id: number; city: string }[] = [];

    totalElements = 0;
    totalPages = 0;
    currentPage = 0;
    pageSize = 5;

    garageService = inject(GarageService);

    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false; 
    errorMessage = '';

    ngOnInit(): void {
        this.fetchUserCars();
        this.fetchCities();
        this.fetchBrands();
        this.fetchModels();
    }

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
  
  

    fetchCities(): void {
        this.garageService.getCities().subscribe({
        next: (cities) => (this.cities = cities),
        error: (err) => {
            const errorMessage = err.error?.description || err.error?.message || 'Error fetching cities';
            this.handleError(errorMessage);
        },
        });
    }
  
  
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

    addCar(): void {
        this.garageService.addCar(this.newCar).subscribe({
        next: (response) => {
            console.log('Car added successfully:', response);
            this.fetchUserCars();
            this.newCar = this.initializeNewCar();
            this.handleSuccess('Car added successfully');
        },
        error: (err) => {
            const errorMessage = err.error?.description || err.error?.message || 'Error adding car';
            this.handleError(errorMessage);
        },
        });
    } 

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
            this.fetchUserCars();
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
  
    deleteCar(id: string): void {
    this.garageService.deleteCar(id).subscribe({
        next: (response) => {
        console.log('Car deleted successfully:', response);
        this.fetchUserCars();
        this.handleSuccess('Car deleted successfully');
        },
        error: (err) => {
        const errorMessage = err.error?.description || err.error?.message || 'Error deleting car';
        this.handleError(errorMessage);
        },
    });
    }


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

    handleSuccess(message: string): void {
        this.successMessage = message;
        this.showSuccessPopup = true;

        setTimeout(() => (this.showSuccessPopup = false), 10000); 
    }

    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;

        setTimeout(() => (this.showErrorPopup = false), 10000); // Auto-hide after 5 seconds
    }  
}
