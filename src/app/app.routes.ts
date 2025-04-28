import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClosetDashboardComponent } from './components/closet-dashboard/closet-dashboard.component';
import { OutfitPlannerComponent } from './components/outfit-planner/outfit-planner.component';
import { PublicOutfitsComponent } from './components/public-outfits/public-outfits.component';
import { UploadClothingComponent } from './components/upload-clothing/upload-clothing.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },                     // default page
  { path: 'dashboard', component: ClosetDashboardComponent },
  { path: 'outfit-planner', component: OutfitPlannerComponent },
  { path: 'public-outfits', component: PublicOutfitsComponent },
  { path: 'upload-clothing', component: UploadClothingComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
