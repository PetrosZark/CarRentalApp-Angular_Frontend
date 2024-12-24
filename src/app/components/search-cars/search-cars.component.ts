import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../shared/services/car.service';

@Component({
    selector: 'app-search-cars',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './search-cars.component.html',
    styleUrls: ['./search-cars.component.css'],
})
export class SearchCarsComponent implements OnInit {
    cars: any[] = [];
    brands: { brand: string }[] = [];
    cities: { city: string }[] = [];
    selectedBrand: string | undefined = undefined;
selectedCity: string | undefined = undefined;
    selectedCar: any = null;

    carService = inject(CarService);

    currentPage = 0;
    totalPages = 0;
    pageSize = 10;

    ngOnInit(): void {
        this.fetchBrands();
        this.fetchCities();
        this.fetchCars();
    }

    fetchCars(filters: { brand?: string; city?: string } = {}, page: number = 0): void {
        const params = {
            ...filters,
            page,
            size: this.pageSize,
        };
    
        this.carService.getCars(params).subscribe({
            next: (response) => {
                this.cars = response.data;
                this.totalPages = response.totalPages || 0;
                this.currentPage = page; 
            },
            error: (err) => {
                console.error('Error fetching cars:', err);
            },
        });
    }   
      

    fetchBrands(): void {
        this.carService.getBrands().subscribe({
        next: (brands) => {
            this.brands = brands.map((brand) => ({brand: brand.brand }));
        },
        error: (err) => {
            console.error('Error fetching brands:', err);
        },
        });
    }

    fetchCities(): void {
        this.carService.getCities().subscribe({
        next: (cities) => {
            this.cities = cities.map((city) => ({ city: city.city }));
        },
        error: (err) => {
            console.error('Error fetching cities:', err);
        },
        });
    }

    applyFilters(): void {    
        const filters = {
        brand: this.selectedBrand || undefined, 
        city: this.selectedCity || undefined,
        };

        this.fetchCars(filters);
    }

    contactOwner(car: any): void {
    this.selectedCar = car; // Set the selected car to display in the modal
    }

    closePopup(): void {
    this.selectedCar = null; // Close the modal by clearing the selected car
    }

    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
          const filters = {
            brand: this.selectedBrand || undefined,
            city: this.selectedCity || undefined,
          };
          this.fetchCars(filters, page);
        }
    }
}
