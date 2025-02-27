import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Subscription } from 'rxjs';
import { ResolutionService } from '../../core/services/resolution.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule, ButtonModule, MenuModule],
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

  constructor(private resolutionService: ResolutionService) {}

  ngOnInit() {
    this.subscription = this.resolutionService.resolution$.subscribe((res) => {
      this.isMobile = res.resolution === 'mobile' || res.resolution === 'tablet';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
