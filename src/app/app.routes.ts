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
import { CitiesComponent } from './components/cities/cities.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: '', redirectTo: '/welcome', pathMatch: 'full'},
    {path: 'garage', component: GarageComponent},
    {path: 'search-cars', component: SearchCarsComponent},
    {path: 'manage-entities', component: ManageEntitiesComponent},
    {path: 'users', component: UsersComponent},
    {path: 'brands', component: BrandsComponent},
    {path: 'car-models', component: CarModelsComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'cities', component: CitiesComponent}
];
