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
  brands: { id: number; brand: string }[] = []; 
  newBrand: string = ''; 

  showSuccessPopup = false; 
  successMessage = ''; 

  showErrorPopup = false; 
  errorMessage = ''; 

  brandService =  inject(BrandService) 

  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (err) => console.error('Error fetching brands:', err),
    });
  }

  addBrand(): void {
    if (!this.newBrand.trim()) {
      console.error('Brand name is required.');
      return;
    }

    const brandPayload = { brand: this.newBrand.trim() };

    this.brandService.createBrand(brandPayload).subscribe({
      next: (brand) => {
        this.brands.push(brand);
        this.fetchBrands();
        this.successMessage = `Brand Created: ID ${brand.id}, Name: ${brand.brand}`;
        this.showSuccessPopup = true;

        this.newBrand = '';

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
  
    setTimeout(() => (this.showErrorPopup = false), 10000); // Auto-hide after 5 seconds
  }
}
