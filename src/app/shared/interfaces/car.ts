// Interface for inserting a new car into the database
export interface CarInsert {
  year: string;         // Year the car was manufactured (as a string)
  mileage: string;      // Current mileage of the car (as a string)
  licensePlate: string; // Unique license plate for the car (identifier)
  brandId: string;      // ID referencing the car's brand (foreign key)
  carmodelId: string;   // ID referencing the car's model (foreign key)
  cityId: string;       // ID referencing the city where the car is located (foreign key)
}

// Interface for reading car data from the database (immutable)
export interface CarReadOnly {
  id: string;           // Unique identifier for the car (primary key)
  year: string;         // Year the car was manufactured
  mileage: string;      // Car mileage
  licensePlate: string; // License plate (unique)
  createdAt: string;    // Timestamp of when the car was created 
  updatedAt: string;    // Timestamp of the last update to the car 
  brand: string;        // Brand name of the car 
  carmodel: string;     // Model name of the car 
  city: string;         // City name where the car is registered or stored
  cityId?: string;      // (Optional) City ID, if needed for updates
  userPhone: string;    // Contact phone number of the car owner/user
  userEmail: string;    // Contact email of the car owner/user
  available: boolean;   // Availability status (true = available, false = not available)
}

// Interface for updating car details in the database
export interface CarUpdate {
  mileage: string;      // Updated mileage for the car
  cityId: number;       // Updated city ID (relocation)
  available: boolean;   // Updated availability status
}
