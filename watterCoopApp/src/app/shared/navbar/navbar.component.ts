import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { ResolutionService } from '../../core/services/resolution.service';
import { CommonModule } from '@angular/common';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenuModule, MobileNavComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  private subscription!: Subscription;

  mobileMenuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Nosotros', icon: 'pi pi-users', routerLink: '/nosotros' },
    { label: 'Contáctanos', icon: 'pi pi-envelope', routerLink: '/contacto' }
  ];

  constructor(
    private resolutionService: ResolutionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.resolutionService.resolution$.subscribe((res) => {
      this.isMobile = res.resolution === 'mobile' || res.resolution === 'tablet';
    });
  }

  scrollToTop() {
    if (this.router.url === '/') {
      // Si ya estás en inicio, solo scrollea
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Si no, routerLink hará la navegación normalmente
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
