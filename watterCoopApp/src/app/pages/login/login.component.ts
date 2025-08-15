import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  async ngOnInit() {
    // Verificar si ya hay una sesión activa
    await this.checkExistingSession();
  }

  async checkExistingSession() {
    try {
      const hasSession = await this.supabaseService.hasActiveSession();
      if (hasSession) {
        // Si ya hay sesión, redirigir al dashboard correspondiente
        await this.redirectBasedOnRole();
      }
    } catch (error) {
      console.error('Error verificando sesión:', error);
    }
  }

  async redirectBasedOnRole() {
    try {
      const role = await this.supabaseService.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'user') {
        this.router.navigate(['/dashboard-user']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Error obteniendo rol:', error);
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { email, password, rememberMe } = this.loginForm.value;

      try {
        // Configurar persistencia de sesión
        if (rememberMe) {
          await this.supabaseService.getClient().auth.setSession({
            access_token: '',
            refresh_token: ''
          });
        }

        const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        if (data.session) {
          this.messageService.add({
            severity: 'success',
            summary: '¡Bienvenido!',
            detail: 'Has iniciado sesión correctamente'
          });

          // Redirigir al dashboard correspondiente
          await this.redirectBasedOnRole();
        }
      } catch (error: any) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación',
          detail: error.message
        });
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors?.['email']) {
        return 'Formato de correo inválido';
      }
      if (field.errors?.['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  cooperativaInfo = {
    nombre: 'Cooperativa de Agua Potable Las Malvinas',
    slogan: 'Agua potable para toda la comunidad',
    direccion: 'Calle 8 Esq Calle Brasil, Las Malvinas, San Rafael, Mendoza',
    telefono: '+54 2604 602545',
    email: 'unionvecinalmalvinas@gmail.com'
  };
}
