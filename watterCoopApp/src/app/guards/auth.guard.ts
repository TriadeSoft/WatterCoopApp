// src/app/guards/dashboard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({ providedIn: 'root' })
export class DashboardGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    // Verificar sesión
    const { data } = await this.supabaseService.getClient().auth.getSession();
    if (!data.session) {
      return this.router.parseUrl('/login');
    }

    // Obtener rol
    const role = await this.supabaseService.getUserRole();

    if (role === 'admin') {
      // Si es admin y ya va a /dashboard → permitir
      return true;
    } else if (role === 'user') {
      // Redirigir a su dashboard
      return this.router.parseUrl('/dashboard-user');
    }

    // Si no tiene rol válido → login
    return this.router.parseUrl('/login');
  }
}
