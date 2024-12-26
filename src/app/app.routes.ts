import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { GarageComponent } from './components/garage/garage.component';
import { SearchCarsComponent } from './components/search-cars/search-cars.component';
import { ManageEntitiesComponent } from './components/manage-entities/manage-entities.component';
import { UsersComponent } from './components/users/users.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CarModelsComponent } from './components/car-models/car-models.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';
import { garageGuard } from './shared/guards/garage.guard';
import { CitiesComponent } from './components/cities/cities.component';

// Define application routes and protect them with guards where necessary
export const routes: Routes = [
    
    // Public Routes (Accessible without authentication)
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/welcome', pathMatch: 'full'},

    // Protected Routes (Require authentication)
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'search-cars', component: SearchCarsComponent, canActivate: [authGuard]},

    // Protected Route (Only the logged-in user can access their own garage)
    {path: 'garage', component: GarageComponent, canActivate: [garageGuard]},

    // Protected Routes (Require "SUPER_ADMIN" role)
    {path: 'manage-entities', component: ManageEntitiesComponent, canActivate: [adminGuard]},
    {path: 'users', component: UsersComponent, canActivate: [adminGuard]},
    {path: 'brands', component: BrandsComponent, canActivate: [adminGuard]},
    {path: 'car-models', component: CarModelsComponent, canActivate: [adminGuard]},
    {path: 'welcome', component: WelcomeComponent, canActivate: [adminGuard]},
    {path: 'cities', component: CitiesComponent, canActivate: [adminGuard]}
];
