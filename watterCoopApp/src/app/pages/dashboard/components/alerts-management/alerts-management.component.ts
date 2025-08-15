import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SupabaseService } from '../../../../services/supabase.service';

interface Alert {
  id: string;
  title: string;
  description: string;
  status: string;
  expires_at: Date;
  active: boolean;
  created_at: Date;
}

@Component({
  selector: 'app-alerts-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './alerts-management.component.html',
  styleUrl: './alerts-management.component.css'
})
export class AlertsManagementComponent implements OnInit {
  alertForm: FormGroup;
  isEditing = false;
  editingAlertId: string | null = null;
  showForm = false;
  isLoading = false;

  statusOptions = [
    { label: 'Crítico', value: 'CRITICO' },
    { label: 'Alto', value: 'ALTO' },
    { label: 'Medio', value: 'MEDIO' },
    { label: 'Bajo', value: 'BAJO' }
  ];

  currentAlert: Alert | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private supabaseService: SupabaseService
  ) {
    this.alertForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['ALTO', Validators.required],
      expires_at: [null, Validators.required],
      active: [true]
    });
  }

  ngOnInit() {
    this.loadCurrentAlert();
  }

  async loadCurrentAlert() {
    this.isLoading = true;
    try {
      // Obtener alertas reales de Supabase
      const alerts = await this.supabaseService.getActiveMessages(1);

      if (alerts && alerts.length > 0) {
        const alert = alerts[0];

        // Mapeo simplificado usando solo campos que sabemos que existen
        this.currentAlert = {
          id: alert.id || '',
          title: alert.title || 'Sin título',
          description: alert.description || 'Sin descripción', // Usar description directamente
          status: alert.status || 'ALTO', // Usar status directamente
          expires_at: alert.expires_at ? new Date(alert.expires_at) : new Date(),
          active: alert.active !== undefined ? alert.active : true,
          created_at: alert.created_at ? new Date(alert.created_at) : new Date()
        };
      } else {
        this.currentAlert = null;
      }
    } catch (error) {
      console.error('Error cargando alerta:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cargar la alerta actual'
      });
      this.currentAlert = null;
    } finally {
      this.isLoading = false;
    }
  }

  showCreateForm() {
    this.showForm = true;
    this.isEditing = false;
    this.resetForm();
  }

  showEditForm() {
    if (this.currentAlert) {
      this.showForm = true;
      this.isEditing = true;
      this.editingAlertId = this.currentAlert.id;
      this.alertForm.patchValue({
        title: this.currentAlert.title,
        description: this.currentAlert.description,
        status: this.currentAlert.status,
        expires_at: new Date(this.currentAlert.expires_at),
        active: this.currentAlert.active
      });
    }
  }

  hideForm() {
    this.showForm = false;
    this.resetForm();
  }

  async onSubmit() {
    if (this.alertForm.valid) {
      if (this.isEditing) {
        await this.updateAlert();
      } else {
        await this.createAlert();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  async createAlert() {
    const alertData = this.alertForm.value;
    this.isLoading = true;

    try {
      // Crear alerta en Supabase
      const { data, error } = await this.supabaseService.getClient()
  .from('messages')
  .insert([{
    title: alertData.title,
    description: alertData.description, //  nombre correcto
    status: alertData.status,           //  nombre correcto
    expires_at: alertData.expires_at.toISOString(),
    active: alertData.active
  }])
  .select()
  .single();

      if (error) throw error;

      this.messageService.add({
        severity: 'success',
        summary: 'Alerta Creada',
        detail: 'La alerta se ha creado correctamente'
      });

      // Recargar la alerta actual
      await this.loadCurrentAlert();
      this.hideForm();

    } catch (error) {
      console.error('Error creando alerta:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo crear la alerta'
      });
    } finally {
      this.isLoading = false;
    }
  }

  async updateAlert() {
    const alertData = this.alertForm.value;
    this.isLoading = true;

    try {
      // Actualizar alerta en Supabase
      const { error } = await this.supabaseService.getClient()
      .from('messages')
      .update({
        title: alertData.title,
        description: alertData.description, //
        status: alertData.status,           //
        expires_at: alertData.expires_at.toISOString(),
        active: alertData.active
      })
      .eq('id', this.editingAlertId);

      if (error) throw error;

      this.messageService.add({
        severity: 'success',
        summary: 'Alerta Actualizada',
        detail: 'La alerta se ha actualizado correctamente'
      });

      // Recargar la alerta actual
      await this.loadCurrentAlert();
      this.hideForm();

    } catch (error) {
      console.error('Error actualizando alerta:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar la alerta'
      });
    } finally {
      this.isLoading = false;
    }
  }

  async deleteAlert() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta alerta?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.isLoading = true;
        try {
          // Eliminar alerta de Supabase
          const { error } = await this.supabaseService.getClient()
            .from('messages')
            .delete()
            .eq('id', this.currentAlert?.id);

          if (error) throw error;

          this.messageService.add({
            severity: 'success',
            summary: 'Alerta Eliminada',
            detail: 'La alerta se ha eliminado correctamente'
          });

          // Recargar la alerta actual
          await this.loadCurrentAlert();

        } catch (error) {
          console.error('Error eliminando alerta:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la alerta'
          });
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  resetForm() {
    this.alertForm.reset({
      title: '',
      description: '',
      status: 'ALTO',
      expires_at: null,
      active: true
    });
    this.isEditing = false;
    this.editingAlertId = null;
  }

  markFormGroupTouched() {
    Object.keys(this.alertForm.controls).forEach(key => {
      const control = this.alertForm.get(key);
      control?.markAsTouched();
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'CRITICO': return '#dc3545';
      case 'ALTO': return '#fd7e14';
      case 'MEDIO': return '#00a8e8';
      case 'BAJO': return '#28a745';
      default: return '#00a8e8';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'CRITICO': return 'Crítico';
      case 'ALTO': return 'Alto';
      case 'MEDIO': return 'Medio';
      case 'BAJO': return 'Bajo';
      default: return status;
    }
  }



}
