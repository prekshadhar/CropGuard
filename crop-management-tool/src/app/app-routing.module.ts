import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FarmerRegistrationComponent } from './farmer-registration/farmer-registration.component';
import { CropInfoComponent } from './crop-info/crop-info.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'farmer-registration', component: FarmerRegistrationComponent },
  { path: 'crop-info', component: CropInfoComponent },
  { path: '**', redirectTo: '' }
];