import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../shared/services/city.service';

@Component({
    selector: 'app-cities',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
    // Array to store the list of cities retrieved from the backend
    cities: { id: number; city: string }[] = [];
    
    // Holds the value of the new city to be added
    newCity: string = '';

    // State for success and error popups
    showSuccessPopup = false;
    successMessage = '';

    showErrorPopup = false;
    errorMessage = '';

    // Inject the CityService to handle API calls
    cityService = inject(CityService);

    // Lifecycle hook - Fetches cities when the component is initialized
    ngOnInit(): void {
        this.fetchCities();
    }

  /**
   * Fetches the list of cities from the backend and populates the cities array.
   */
    fetchCities(): void {
        this.cityService.getCities().subscribe({
            next: (cities) => {
                this.cities = cities; // Update the list of cities
            },
            error: (err) => console.error('Error fetching cities:', err),
        });
    }

  /**
   * Handles adding a new city by sending a request to the backend.
   * Validates that the input is not empty before proceeding.
   */
    addCity(): void {
        if (!this.newCity.trim()) {
            console.error('City name is required.');
            return;
        }

        const cityPayload = { city: this.newCity.trim() };

        this.cityService.createCity(cityPayload).subscribe({
            next: (city) => {
                this.cities.push(city);
                this.fetchCities(); // Refresh the list from the backend
                
                // Show success message
                this.successMessage = `City Created: ID ${city.id}, Name: ${city.city}`;
                this.showSuccessPopup = true;

                this.newCity = ''; // Reset the input field

                // Auto-hide the success popup after 10 seconds
                setTimeout(() => (this.showSuccessPopup = false), 10000);
            },
            error: (err) => {
                this.handleError(err.error?.description || 'Error creating city.');
            },
        });
    }

  /**
   * Handles error display by showing a popup with the error message.
   */
    handleError(message: string): void {
        this.errorMessage = message;
        this.showErrorPopup = true;

        setTimeout(() => (this.showErrorPopup = false), 10000); 
    }
}
