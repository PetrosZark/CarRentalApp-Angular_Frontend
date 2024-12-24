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
carModels: { id: number; carmodel: string; brand: string }[] = [];
filteredCarModels: { id: number; carmodel: string; brand: string }[] = [];
brands: { id: number; brand: string }[] = [];
selectedBrand: string | null = null;

showCreateModelForm = false;

showSuccessPopup = false;
successMessage = '';

showErrorPopup = false; 
errorMessage = ''; 


newModel = {
    brandId: null as number | null,
    carmodel: '',
};

carModelService = inject(CarModelService) 

ngOnInit(): void {
    this.fetchCarModels();
    this.fetchBrands();
}

fetchCarModels(): void {
    this.carModelService.getCarModels().subscribe({
    next: (models) => {
        this.carModels = models;
        this.filteredCarModels = models;
    },
    error: (err) => console.error('Error fetching car models:', err),
    });
}

fetchBrands(): void {
    this.carModelService.getBrands().subscribe({
    next: (brands) => {
        this.brands = brands;
    },
    error: (err) => console.error('Error fetching brands:', err),
    });
}

filterByBrand(): void {
    if (this.selectedBrand) {
    this.filteredCarModels = this.carModels.filter(
        (model) => model.brand === this.selectedBrand
    );
    } else {
    this.filteredCarModels = this.carModels;
    }
}

toggleCreateModelForm(): void {
    this.showCreateModelForm = !this.showCreateModelForm;
    if (!this.showCreateModelForm) {
    this.newModel = { brandId: null, carmodel: '' }; 
    }
}

createModel(): void {
    if (this.newModel.brandId === null || !this.newModel.carmodel.trim()) {
    console.error('Brand and model name are required.');
    return;
    }

    const modelPayload = {
    brandId: this.newModel.brandId as number,
    carmodel: this.newModel.carmodel.trim(),
    };

    this.carModelService.createCarModel(modelPayload).subscribe({
    next: (model) => {
        this.carModels.push(model);
        this.filterByBrand(); 
        this.successMessage = `Car Model Created: ID ${model.id}, Name: ${model.carmodel}, Brand: ${model.brand}`;
        this.showSuccessPopup = true;

        this.resetCreateModelForm();
        this.toggleCreateModelForm();

        setTimeout(() => (this.showSuccessPopup = false), 10000);
    },
    error: (err) => {
        this.handleError(err.error?.description || 'Error creating car model.');
    },
    });
}

handleError(message: string): void {
    this.errorMessage = message;
    this.showErrorPopup = true;

    setTimeout(() => (this.showErrorPopup = false), 10000); 
}


resetCreateModelForm(): void {
    this.newModel = { brandId: null, carmodel: '' };
}
}
