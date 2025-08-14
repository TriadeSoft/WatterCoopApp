import { Injectable } from '@angular/core';
import { WaterTip } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private tips: WaterTip[] = [
    {
      id: 1,
      title: 'Evita fugas',
      image: 'mantenimientofugas.webp',
      description: 'Revisa periódicamente las tuberías y conexiones para evitar pérdidas de agua. Si notas humedad en las paredes o un aumento en el consumo, podría haber una fuga oculta.'
    },
    {
      id: 2,
      title: 'Usa agua responsablemente',
      image: 'cuidadoalbañarse.webp',
      description: 'Toma duchas cortas y cierra la llave mientras te enjabonas o lavas los dientes. Ahorrarás hasta 20 litros de agua por minuto.'
    },
    {
      id: 3,
      title: 'Riego eficiente',
      image: 'riego.webp',
      description: 'Riega temprano en la mañana o al atardecer para reducir la evaporación. Usa un sistema de riego por goteo para optimizar el consumo de agua.'
    },
    {
      id: 4,
      title: 'Invierno sin congelaciones',
      image: 'invierno.webp',
      description: 'Aísla las tuberías expuestas con materiales especiales para evitar que se congelen y revienten en invierno. En noches muy frías, deja correr un hilo de agua para evitar bloqueos.'
    },
    {
      id: 5,
      title: 'Mantenimiento del medidor',
      image: 'mantenimientomedidor.webp',
      description: 'Asegúrate de que el medidor de agua esté en buen estado y protegido de golpes o temperaturas extremas. Revisa que no tenga fugas y toma lecturas periódicas para controlar tu consumo.'
    },
    {
      id: 6,
      title: 'Ubicación segura del tanque',
      image: 'ubicaciontanque.webp',
      description: 'Instala el tanque de agua en un lugar seguro, elevado y protegido de temperaturas extremas. Un tanque mal ubicado puede generar problemas de presión y contaminación del agua.'
    },
    {
      id: 7,
      title: 'Cuidado con las conexiones eléctricas',
      image: 'cuidadoconlaelectricidad.webp',
      description: 'Mantén las instalaciones de agua alejadas de cables eléctricos y aparatos conectados. Si hay filtraciones cerca de conexiones eléctricas, podrían causar accidentes graves.'
    },
    {
      id: 8,
      title: 'Limpieza del tanque de agua',
      image: 'limpiezatanque.webp',
      description: 'Limpia y desinfecta el tanque de agua al menos una vez al año para evitar la acumulación de sedimentos y bacterias. Usa productos recomendados para garantizar agua potable segura.'
    }
  ];



  getTips(): Promise<WaterTip[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.tips), 500);
    });
  }
}
