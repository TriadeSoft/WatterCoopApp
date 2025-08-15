import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'inicio', component: LandingComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard]
  },
  { path: 'dashboard-user', component: LandingComponent, canActivate: [DashboardGuard] },//TODO review after create user dashboard
  { path: '**', redirectTo: '' }
];
