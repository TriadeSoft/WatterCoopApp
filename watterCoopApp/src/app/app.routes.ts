import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'inicio', component: LandingComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: LandingComponent }, // Temporalmente redirige al landing
  { path: '**', redirectTo: '' }
];
