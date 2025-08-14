import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  createRipple(event: MouseEvent) {
    const ripple = this.renderer.createElement('div');
    this.renderer.addClass(ripple, 'ripple');

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'left', x + 'px');
    this.renderer.setStyle(ripple, 'top', y + 'px');
    this.renderer.setStyle(ripple, 'width', size + 'px');
    this.renderer.setStyle(ripple, 'height', size + 'px');

    this.renderer.appendChild(event.currentTarget as HTMLElement, ripple);

    setTimeout(() => {
      this.renderer.removeChild(event.currentTarget as HTMLElement, ripple);
    }, 1500);
  }
}
