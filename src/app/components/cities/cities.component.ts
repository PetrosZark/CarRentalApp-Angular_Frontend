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
  cities: { id: number; city: string }[] = [];
  newCity: string = '';

  showSuccessPopup = false;
  successMessage = '';

  showErrorPopup = false;
  errorMessage = '';

  cityService = inject(CityService);

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.cityService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (err) => console.error('Error fetching cities:', err),
    });
  }

  addCity(): void {
    if (!this.newCity.trim()) {
      console.error('City name is required.');
      return;
    }

    const cityPayload = { city: this.newCity.trim() };

    this.cityService.createCity(cityPayload).subscribe({
      next: (city) => {
        this.cities.push(city);
        this.fetchCities();
        this.successMessage = `City Created: ID ${city.id}, Name: ${city.city}`;
        this.showSuccessPopup = true;

        this.newCity = '';

        setTimeout(() => (this.showSuccessPopup = false), 10000);
      },
      error: (err) => {
        this.handleError(err.error?.description || 'Error creating city.');
      },
    });
  }

  handleError(message: string): void {
    this.errorMessage = message;
    this.showErrorPopup = true;

    setTimeout(() => (this.showErrorPopup = false), 10000); // Auto-hide after 5 seconds
  }
}
