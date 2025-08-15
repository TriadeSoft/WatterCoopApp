import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { AlertsManagementComponent } from './components/alerts-management/alerts-management.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    AvatarModule,
    DividerModule,
    AlertsManagementComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  sidebarVisible = true;
  currentSection = 'alerts';
  adminInfo = {
    email: '',
    name: 'Usuario',
    avatar: 'https://ui-avatars.com/api/?name=User&background=00a8e8&color=fff&size=128'
  };

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => this.navigateToSection('dashboard')
    },
    {
      label: 'Alertas',
      icon: 'pi pi-exclamation-triangle',
      command: () => this.navigateToSection('alerts')
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      command: () => this.navigateToSection('users'),
      disabled: true
    }
  ];

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.loadUserInfo();
  }

  async loadUserInfo() {
    try {
      const { data: { session } } = await this.supabaseService.getClient().auth.getSession();
      if (session?.user) {
        this.adminInfo.email = session.user.email || '';
        this.adminInfo.name = this.extractUserName(session.user.email || '');
        this.adminInfo.avatar = `https://ui-avatars.com/api/?name=${this.adminInfo.name}&background=00a8e8&color=fff&size=128`;
      }
    } catch (error) {
      console.error('Error cargando información del usuario:', error);
    }
  }

  extractUserName(email: string): string {
    if (email) {
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'Usuario';
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  navigateToSection(section: string) {
    this.currentSection = section;
    this.sidebarVisible = false;
  }

  getSectionTitle(): string {
    switch (this.currentSection) {
      case 'alerts':
        return 'Gestión de Alertas';
      case 'dashboard':
        return 'Panel Principal';
      case 'users':
        return 'Gestión de Usuarios';
      default:
        return 'Dashboard';
    }
  }

  getSectionDescription(): string {
    switch (this.currentSection) {
      case 'alerts':
        return 'Gestiona las alertas que se muestran a los usuarios';
      case 'dashboard':
        return 'Bienvenido al panel de administración';
      case 'users':
        return 'Administra los usuarios del sistema';
      default:
        return '';
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async logout() {
    try {
      await this.supabaseService.getClient().auth.signOut();
      // Redirigir al login después de cerrar sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Intentar redirigir de todas formas
      this.router.navigate(['/login']);
    }
  }
}
