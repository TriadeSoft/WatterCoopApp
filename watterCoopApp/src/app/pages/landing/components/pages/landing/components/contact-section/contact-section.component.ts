import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  isSent = false;

  // IDs de EmailJS del cliente
  private serviceId = 'service_c9cci4l';   // Email Services → Service ID
  private templateId = 'template_gmgh65b';  // Email Templates → Template ID

  getCurrentTime(): string {
    return new Date().toLocaleString();
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    try {
      // Inicializar EmailJS (solo la primera vez)
      emailjs.init('plNAlZ8Kcs1lUl2kE'); // Reemplaza con tu Public Key

      await emailjs.sendForm(this.serviceId, this.templateId, form);

      this.isSent = true;
      form.reset();
      setTimeout(() => (this.isSent = false), 5000);
    } catch (err) {
      console.error('Error al enviar con EmailJS:', err);
      // aquí podés mostrar un toast de error si querés
    }
  }
}
