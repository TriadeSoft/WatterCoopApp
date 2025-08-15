import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { SupabaseService } from '../../../../services/supabase.service';

export interface NoticeData {
  id: string;
  title: string;
  description: string;
  expires_at: string;
  active: boolean;
  status?: string;
}

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    BadgeModule
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent implements OnInit, OnDestroy {

  hasActiveNotices = false;
  activeNotices: NoticeData[] = [];
  isLoading = true;
  private countdownInterval?: any;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadActiveNotices();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private async loadActiveNotices() {
    try {
      this.isLoading = true;
      const notices = await this.supabaseService.getActiveMessages(3);
      this.activeNotices = notices;
      this.hasActiveNotices = this.activeNotices.length > 0;

      if (this.hasActiveNotices) {
        this.startCountdown();
      }
    } catch (error) {
      console.error('Error loading notices:', error);
      this.hasActiveNotices = false;
    } finally {
      this.isLoading = false;
    }
  }

  private startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.loadActiveNotices(); // Recargar avisos cada minuto
      if (!this.hasActiveNotices) {
        clearInterval(this.countdownInterval);
      }
    }, 60000); // Actualizar cada minuto
  }

  getPriorityIcon(status?: string): string {
    const icon = (() => {
      switch (status?.toUpperCase()) {
        case 'CRITICO':
          return 'pi-exclamation-triangle';
        case 'ALTO':
          return 'pi-exclamation-circle';
        case 'MEDIO':
          return 'pi-info-circle';
        case 'BAJO':
          return 'pi-check-circle';
        default:
          return 'pi-exclamation-triangle';
      }
    })();

    return icon;
  }

  getPriorityText(status?: string): string {
    switch (status?.toUpperCase()) {
      case 'CRITICO':
        return 'CRÍTICO';
      case 'ALTO':
        return 'ALTO';
      case 'MEDIO':
        return 'MEDIO';
      case 'BAJO':
        return 'BAJO';
      default:
        return 'IMPORTANTE';
    }
  }

  getPriorityColor(status?: string): string {
    switch (status?.toUpperCase()) {
      case 'CRITICO':
        return '#dc3545';
      case 'ALTO':
        return '#fd7e14';
      case 'MEDIO':
        return '#00a8e8';
      case 'BAJO':
        return '#28a745';
      default:
        return '#00a8e8';
    }
  }

  getPriorityBgColor(status?: string): string {
    switch (status?.toUpperCase()) {
      case 'CRITICO':
        return 'rgba(220, 53, 69, 0.1)';
      case 'ALTO':
        return 'rgba(253, 126, 20, 0.1)';
      case 'MEDIO':
        return 'rgba(0, 168, 232, 0.1)';
      case 'BAJO':
        return 'rgba(40, 167, 69, 0.1)';
      default:
        return 'rgba(0, 168, 232, 0.1)';
    }
  }

  getPriorityBorderColor(status?: string): string {
    switch (status?.toUpperCase()) {
      case 'CRITICO':
        return 'rgba(220, 53, 69, 0.3)';
      case 'ALTO':
        return 'rgba(253, 126, 20, 0.3)';
      case 'MEDIO':
        return 'rgba(0, 168, 232, 0.3)';
      case 'BAJO':
        return 'rgba(40, 167, 69, 0.3)';
      default:
        return 'rgba(0, 168, 232, 0.3)';
    }

  }

  closeNotice(noticeId: string) {
    this.activeNotices = this.activeNotices.filter(notice => notice.id !== noticeId);
    this.hasActiveNotices = this.activeNotices.length > 0;

    if (!this.hasActiveNotices && this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  getTimeRemaining(notice: NoticeData): string {
    // Fecha local Argentina
    const endDateLocal = new Date(
      new Date(notice.expires_at).toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })
    );

    const nowLocal = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })
    );

    const timeDiff = endDateLocal.getTime() - nowLocal.getTime();

    if (timeDiff <= 0) {
      return '';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} día${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }


}
