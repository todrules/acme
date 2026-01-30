import { Routes } from '@angular/router';
import {ShoppingComponent} from "./views/shopping/shopping.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {ProfileComponent} from "./views/profile/profile.component";
import {SettingsComponent} from "./views/settings/settings.component";

export const routes: Routes = [
  {path: '', component: SettingsComponent},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent}
];
