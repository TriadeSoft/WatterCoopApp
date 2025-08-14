import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeroSectionComponent } from './components/pages/landing/components/hero-section/hero-section.component';
import { AboutSectionComponent } from './components/pages/landing/components/about-section/about-section.component';
import { ServicesSectionComponent } from './components/pages/landing/components/services-section/services-section.component';
import { NewsSectionComponent } from './components/pages/landing/components/news-section/news-section.component';
import { FaqSectionComponent } from './components/pages/landing/components/faq-section/faq-section.component';
import { ContactSectionComponent } from './components/pages/landing/components/contact-section/contact-section.component';
import { NoticeComponent, NoticeData } from "./components/notice/notice.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    NewsSectionComponent,
    FaqSectionComponent,
    ContactSectionComponent,
    NoticeComponent
],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  // Datos de demostración para el componente Notice
  noticeData: NoticeData = {
    id: '1',
    title: '🚰 Mantenimiento Programado del Sistema',
    message: 'Se realizará mantenimiento preventivo en el sistema de agua potable el próximo lunes 15 de enero de 8:00 a 12:00 horas. Durante este período, el servicio estará interrumpido en las siguientes calles: Calle 8, Calle Brasil y alrededores. Agradecemos su comprensión y recomendamos almacenar agua potable con anticipación.',
    imageUrl: 'assets/images/icons/alert-icon.png',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    priority: 'high',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Ejemplo de notice crítico (para mostrar diferentes estilos)
  criticalNotice: NoticeData = {
    id: '2',
    title: '🚨 EMERGENCIA: Interrupción del Servicio',
    message: 'Se ha detectado una fuga crítica en la red principal. El servicio estará interrumpido hasta que se complete la reparación. Equipos técnicos trabajando en el área.',
    imageUrl: 'assets/images/icons/alert-icon.png',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02'),
    priority: 'critical',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Ejemplo de notice de prioridad media
  mediumNotice: NoticeData = {
    id: '3',
    title: 'ℹ️ Cambio de Horarios de Atención',
    message: 'A partir del próximo mes, nuestros horarios de atención al público cambiarán. Lunes a Viernes: 8:00 - 18:00, Sábados: 8:00 - 12:00. Los domingos permaneceremos cerrados.',
    imageUrl: 'assets/images/icons/alert-icon.png',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-29'),
    priority: 'medium',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Ejemplo de notice de prioridad baja
  lowNotice: NoticeData = {
    id: '4',
    title: '✅ Recordatorio: Pago de Cuotas',
    message: 'Recordamos que el pago de cuotas mensuales vence el día 15 de cada mes. Pueden realizar el pago en nuestras oficinas o a través de transferencia bancaria.',
    imageUrl: 'assets/images/icons/alert-icon.png',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    priority: 'low',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  createRipple(event: MouseEvent) {
    const container = this.el.nativeElement.querySelector('.landing-container');
    if (!container) {
      console.error('Landing container not found');
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.createMainRipple(container, x, y);

    setTimeout(() => this.createSecondaryWave(container, x, y), 80);
    setTimeout(() => this.createSecondaryWave(container, x, y), 160);
  }

  private createMainRipple(container: HTMLElement, x: number, y: number) {
    const ripple = this.renderer.createElement('div');
    this.renderer.addClass(ripple, 'ripple');

    const size = 10 + Math.random() * 5; // Entre 10px y 15px en tamaño inicial
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'margin-left', `-${size / 2}px`);
    this.renderer.setStyle(ripple, 'margin-top', `-${size / 2}px`);

    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);

    this.renderer.appendChild(container, ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        this.renderer.removeChild(container, ripple);
      }
    }, 2000);
  }

  private createSecondaryWave(container: HTMLElement, x: number, y: number) {
    const wave = this.renderer.createElement('div');
    this.renderer.addClass(wave, 'ripple-wave');

    const offsetX = Math.random() * 2 - 1;
    const offsetY = Math.random() * 2 - 1;

    this.renderer.setStyle(wave, 'left', `${x + offsetX}px`);
    this.renderer.setStyle(wave, 'top', `${y + offsetY}px`);

    const size = 3 + Math.random() * 2;
    this.renderer.setStyle(wave, 'width', `${size}px`);
    this.renderer.setStyle(wave, 'height', `${size}px`);
    this.renderer.setStyle(wave, 'margin-left', `-${size / 2}px`);
    this.renderer.setStyle(wave, 'margin-top', `-${size / 2}px`);

    this.renderer.appendChild(container, wave);

    setTimeout(() => {
      if (wave.parentNode) {
        this.renderer.removeChild(container, wave);
      }
    }, 1300);
  }
}
