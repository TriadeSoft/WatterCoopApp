import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputTextarea,
    CardModule,
    DividerModule,
    TooltipModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  isSent = false;
  isLoading = false;

  // IDs de EmailJS del cliente
  private serviceId = 'service_c9cci4l';
  private templateId = 'template_gmgh65b';

  // Información de la cooperativa
  cooperativaInfo = {
    nombre: 'Cooperativa de Agua Potable Las Malvinas',
    direccion: 'Calle 8 Esq Calle Brasil, Las Malvinas, San Rafael, Mendoza',
    telefono: '+54 2604 602545',
    whatsapp: '+54 2604 602545',
    email: 'unionvecinalmalvinas@gmail.com',
    horarios: {
      lunesViernes: '8:00 - 18:00',
      sabado: '8:00 - 12:00',
      domingo: 'Cerrado'
    },
    emergencia: '+54 2604 602545'
  };

  // Preguntas frecuentes
  faqs = [
    {
      pregunta: '¿Cómo puedo reportar una fuga de agua?',
      respuesta: 'Puedes reportar una fuga llamando al teléfono de emergencia o enviando un mensaje por WhatsApp. Es importante reportar lo antes posible para evitar desperdicios.',
      expanded: false
    },
    {
      pregunta: '¿Cuáles son los horarios de atención?',
      respuesta: 'Atendemos de lunes a viernes de 8:00 a 18:00, y los sábados de 8:00 a 12:00. Para emergencias, estamos disponibles 24/7.',
      expanded: false
    },
    {
      pregunta: '¿Cómo puedo solicitar la conexión del servicio?',
      respuesta: 'Para solicitar la conexión, debes presentar la documentación requerida en nuestras oficinas o contactarnos para coordinar una visita técnica.',
      expanded: false
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos efectivo, transferencias bancarias y pagos electrónicos. También ofrecemos planes de pago para casos especiales.',
      expanded: false
    }
  ];

  getCurrentTime(): string {
    return new Date().toLocaleString('es-AR');
  }


async onSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  this.isLoading = true;

  try {
    // Inicializar EmailJS con clave pública
    emailjs.init(environment.emailJsPublicKey);

    // Enviar usando IDs desde environment
    await emailjs.sendForm(
      environment.emailJsServiceId,
      environment.emailJsTemplateId,
      form
    );

    this.isSent = true;
    form.reset();
    setTimeout(() => (this.isSent = false), 5000);
  } catch (err) {
    console.error('Error al enviar con EmailJS:', err);
  } finally {
    this.isLoading = false;
  }
}

  openWhatsApp() {
    const message = encodeURIComponent('Hola, necesito información sobre los servicios de agua potable.');
    window.open(`https://wa.me/${this.cooperativaInfo.whatsapp}?text=${message}`, '_blank');
  }

  openEmail() {
    const subject = encodeURIComponent('Consulta - Cooperativa de Agua Potable');
    const body = encodeURIComponent('Hola, me gustaría obtener información sobre...');
    window.open(`mailto:${this.cooperativaInfo.email}?subject=${subject}&body=${body}`, '_blank');
  }

  openMap() {
    const address = encodeURIComponent(this.cooperativaInfo.direccion);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }

  toggleFaq(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
}
