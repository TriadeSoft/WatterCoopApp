import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';

export interface NoticeData {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  @Input() noticeData?: NoticeData;

  hasActiveNotices = false;
  activeNotices: NoticeData[] = [];
  private countdownInterval?: any;

  ngOnInit() {
    this.checkNoticesVisibility();
    if (this.hasActiveNotices) {
      this.startCountdown();
    }
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private checkNoticesVisibility() {
    if (!this.noticeData) {
      this.hasActiveNotices = false;
      this.activeNotices = [];
      return;
    }

    const now = new Date();
    const startDate = new Date(this.noticeData.startDate);
    const endDate = new Date(this.noticeData.endDate);

    const isActive = this.noticeData.isActive &&
                     now >= startDate &&
                     now <= endDate;

    if (isActive) {
      this.activeNotices = [this.noticeData];
      this.hasActiveNotices = true;
    } else {
      this.hasActiveNotices = false;
      this.activeNotices = [];
    }
  }

  private startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.checkNoticesVisibility();
      if (!this.hasActiveNotices) {
        clearInterval(this.countdownInterval);
      }
    }, 60000); // Actualizar cada minuto
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'critical':
        return 'pi-exclamation-triangle';
      case 'high':
        return 'pi-exclamation-circle';
      case 'medium':
        return 'pi-info-circle';
      case 'low':
        return 'pi-check-circle';
      default:
        return 'pi-info-circle';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'critical':
        return 'CRÍTICO';
      case 'high':
        return 'ALTO';
      case 'medium':
        return 'MEDIO';
      case 'low':
        return 'BAJO';
      default:
        return '';
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
    const now = new Date();
    const endDate = new Date(notice.endDate);
    const timeDiff = endDate.getTime() - now.getTime();

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

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
