import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simular proceso de login
      setTimeout(() => {
        const { username, password } = this.loginForm.value;

        // Aquí iría tu lógica real de autenticación
        if (username === 'admin' && password === 'admin123') {
          this.messageService.add({
            severity: 'success',
            summary: '¡Bienvenido!',
            detail: 'Has iniciado sesión correctamente'
          });

          // Redirigir al dashboard después de un breve delay
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de autenticación',
            detail: 'Usuario o contraseña incorrectos'
          });
        }

        this.isLoading = false;
      }, 1500);
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
      if (field.errors?.['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  // Información de la cooperativa para mostrar en el login
  cooperativaInfo = {
    nombre: 'Cooperativa de Agua Potable Las Malvinas',
    slogan: 'Agua potable para toda la comunidad',
    direccion: 'Calle 8 Esq Calle Brasil, Las Malvinas, San Rafael, Mendoza',
    telefono: '+54 2604 602545',
    email: 'unionvecinalmalvinas@gmail.com'
  };
}
