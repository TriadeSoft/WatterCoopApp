import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HeroSectionComponent } from './components/pages/landing/components/hero-section/hero-section.component';
import { AboutSectionComponent } from './components/pages/landing/components/about-section/about-section.component';
import { ServicesSectionComponent } from './components/pages/landing/components/services-section/services-section.component';
import { NewsSectionComponent } from './components/pages/landing/components/news-section/news-section.component';
import { FaqSectionComponent } from './components/pages/landing/components/faq-section/faq-section.component';
import { ContactSectionComponent } from './components/pages/landing/components/contact-section/contact-section.component';

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
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
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
