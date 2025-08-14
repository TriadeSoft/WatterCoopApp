import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-faq-section',
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {

  activeIndex: number | null = null;

  faqItems = [
    {
      question: '¿Qué debo hacer si no recibí mi factura?',
      answer: `
        <p>Si no recibiste tu factura de agua, puedes obtenerla de las siguientes maneras:</p>
        <ul>
          <li><strong>Consulta por WhatsApp </strong> Escríbenos y te enviaremos una copia digital.</li>
          <li><strong>Consulta por telefono:</strong> Puedes llamarnos a nuestro telefono.</li>
        </ul>
        <p><em>Es importante mantener actualizados tus datos de contacto para recibir notificaciones y evitar demoras en el pago.</em></p>
      `
    },
    {
      question: '¿Cómo solicito una nueva conexión de agua?',
      answer: `
        <p>Para solicitar una nueva conexión de agua potable, sigue estos pasos:</p>
        <ol>
          <li><strong>Reúne la documentación:</strong> Necesitarás presentar tu DNI, escritura del terreno o contrato de alquiler, y un croquis de ubicación.</li>
          <li><strong>Contactanos :</strong> Para coordinar la instalacion.</li>
          <li><strong>Inspección técnica:</strong> Un técnico evaluará la viabilidad de la conexión en el domicilio.</li>
          <li><strong>Pago de derechos de conexión:</strong> Una vez aprobado, deberás abonar el costo de instalación.</li>
          <li><strong>Instalación del servicio:</strong> En un plazo estimado, se procederá a la conexión del agua.</li>
        </ol>
        <p>Para más detalles sobre costos y plazos, contáctanos antes de iniciar el trámite.</p>
      `
    },
    {
      question: '¿Cómo se mide el consumo de agua?',
      answer: `
        <p>El consumo de agua se mide mediante un medidor instalado en tu domicilio. Este dispositivo registra la cantidad de agua utilizada en metros cúbicos (m³).</p>
        <ul>
          <li><strong>Cómo leer el medidor:</strong> Cada medidor tiene un contador que muestra el total de m³ consumidos.</li>
          <li><strong>Facturación:</strong> La cooperativa toma lecturas periódicas del medidor para calcular tu factura.</li>
          <li><strong>Consejos para monitorear el consumo:</strong> Puedes revisar tu medidor regularmente y comparar tus consumos mensuales para detectar posibles fugas o variaciones.</li>
        </ul>
        <p>Si tienes dudas sobre tu medición, puedes solicitar una verificación a la cooperativa.</p>
      `
    },
    {
      question: '¿Qué hacer si tengo una fuga de agua o baja presión?',
      answer: `
        <p>Si detectas una fuga o notas una baja en la presión del agua, sigue estos pasos:</p>
        <ul>
          <li><strong>Fugas dentro del hogar:</strong>
            <ul>
              <li>Cierra la llave de paso y verifica si el medidor sigue girando.</li>
              <li>Revisa inodoros, grifos y cañerías visibles en busca de filtraciones.</li>
              <li>Contacta a un plomero para reparaciones internas.</li>
            </ul>
          </li>
          <li><strong>Fugas en la vía pública:</strong>
            <ul>
              <li>Comunícate con la cooperativa para reportar el problema.</li>
              <li>Indica la ubicación exacta y, si es posible, envía fotos.</li>
            </ul>
          </li>
          <li><strong>Baja presión de agua:</strong>
            <ul>
              <li>Verifica si el problema ocurre en toda la vivienda o solo en ciertos grifos.</li>
              <li>Consulta con vecinos si también tienen baja presión.</li>
              <li>Si el problema persiste, repórtalo a la cooperativa para su revisión.</li>
            </ul>
          </li>
        </ul>
        <p>Una detección temprana de fugas ayuda a evitar desperdicios de agua y costos adicionales en tu factura.</p>
      `
    },
    {
      question: '¿Cómo me contacto con la cooperativa?',
      answer: `
        <p>Puedes comunicarte con nosotros a través de los siguientes canales:</p>
        <ul>
          <li><strong>Teléfono:</strong> Llama a nuestra línea de atención al cliente.</li>
          <li><strong>WhatsApp:</strong> Envíanos un mensaje y te responderemos a la brevedad.</li>
          <li><strong>Correo electrónico:</strong> Escríbenos para consultas o gestiones administrativas.</li>
          <li><strong>Redes sociales:</strong> Síguenos en nuestras plataformas para recibir información actualizada sobre el servicio.</li>
        </ul>
        <p><em>Nuestro horario de atención es de lunes a viernes de 8:00 a 16:00. ¡Estamos para ayudarte!</em></p>
      `
    }
  ];


  toggleItem(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
