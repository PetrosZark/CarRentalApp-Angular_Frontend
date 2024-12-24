export interface CarInsert {
    year: string;        // The year of the car as a string
    mileage: string;     // The mileage of the car as a string
    licensePlate: string; // The unique license plate for the car
    brandId: string;      // The ID of the brand (replaces `brand` as a name)
    carmodelId: string;   // The ID of the car model (replaces `carmodel` as a name)
    cityId: string;       // The ID of the city (replaces `city` as a name)
  }

  export interface CarReadOnly {
    id: string;
    year: string;
    mileage: string;
    licensePlate: string;
    createdAt: string;
    updatedAt: string;
    brand: string;
    carmodel: string;
    city: string;
    cityId?: string; // Optional if used only in specific scenarios
    userPhone: string;
    userEmail: string;
    available: boolean;
}

export interface CarUpdate {
  mileage: string;
  cityId: number;
  available: boolean;
}
