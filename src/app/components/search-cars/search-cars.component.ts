import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../shared/services/car.service';
import { CarReadOnly } from '../../shared/interfaces/car';

@Component({
    selector: 'app-search-cars',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './search-cars.component.html',
    styleUrls: ['./search-cars.component.css'],
})
export class SearchCarsComponent implements OnInit {
    // List of cars returned from the backend
    cars: any[] = [];
    
    // Dropdown lists for filtering
    brands: { brand: string }[] = [];
    cities: { city: string }[] = [];
    
    // Selected filter values
    selectedBrand: string | undefined = undefined;
    selectedCity: string | undefined = undefined;
    
    // Selected car for contact modal
    selectedCar: any = null;
    
    // Selected car for image display modal
    selectedCarImage: CarReadOnly | null = null;

    // Inject CarService for data fetching
    carService = inject(CarService);

    // Pagination properties
    currentPage = 0;
    totalPages = 0;
    pageSize = 10;

    // Lifecycle hook - Fetch initial data on component load
    ngOnInit(): void {
        this.fetchBrands();
        this.fetchCities();
        this.fetchCars();
    }

    /**
     * Fetches the list of cars from the backend with optional filters and pagination.
     * @param filters Optional filters for brand and city.
     * @param page Page number to fetch (defaults to 0).
     */
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
      

    /**
     * Fetches list of car brands for the brand dropdown.
     */
    fetchBrands(): void {
        this.carService.getBrands().subscribe({
        next: (brands) => {
            // Map the response to extract only the brand name
            this.brands = brands.map((brand) => ({brand: brand.brand }));
        },
        error: (err) => {
            console.error('Error fetching brands:', err);
        },
        });
    }

    /**
     * Fetches list of cities for the city dropdown.
     */
    fetchCities(): void {
        this.carService.getCities().subscribe({
        next: (cities) => {
            // Map the response to extract only the city name
            this.cities = cities.map((city) => ({ city: city.city }));
        },
        error: (err) => {
            console.error('Error fetching cities:', err);
        },
        });
    }

    /**
     * Applies the selected filters (brand and city) to the car search.
     * Fetches filtered results from the backend.
     */
    applyFilters(): void {    
        const filters = {
        brand: this.selectedBrand || undefined, 
        city: this.selectedCity || undefined,
        };

        this.fetchCars(filters);
    }

    /**
     * Opens the contact owner modal by setting the selected car.
     * @param car The car whose owner's contact info will be shown.
     */
    contactOwner(car: any): void {
    this.selectedCar = car; // Set the selected car to display in the modal
    }

    /**
     * Closes the contact owner modal by clearing the selected car.
     */
    closePopup(): void {
    this.selectedCar = null; // Close the modal by clearing the selected car
    }

    /**
     * Navigates to a specific page in the pagination.
     * Ensures the page number is valid before fetching data.
     * @param page The page number to navigate to.
     */
    goToPage(page: number): void {
        if (page >= 0 && page < this.totalPages) {
          const filters = {
            brand: this.selectedBrand || undefined,
            city: this.selectedCity || undefined,
          };
          this.fetchCars(filters, page);
        }
    }

    /**
     * Opens the car image modal by setting the selected car.
     * @param car The car whose image will be displayed in the modal.
     */
    openImageModal(car: CarReadOnly): void {
        this.selectedCarImage = car;
    }    

    /**
     * Closes the car image modal by clearing the selected car image.
     */
    closeImageModal(): void {
        this.selectedCarImage = null;
    }
}
