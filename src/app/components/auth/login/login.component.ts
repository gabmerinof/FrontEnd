import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, CommonModule,
    ReactiveFormsModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isCheckingUser = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Si ya está autenticado, redirigir a la página principal
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email')?.value;

      this.authService.login(email).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success) {
            this.snackBar.open(
              response.data?.user.exists ?
                '¡Bienvenido de nuevo!' :
                '¡Usuario creado exitosamente!',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate(['/tasks']);
          } else {
            this.snackBar.open(
              response.error || 'Error en el login',
              'Cerrar',
              { duration: 5000 }
            );
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            'Error de conexión. Intenta nuevamente.',
            'Cerrar',
            { duration: 5000 }
          );
          console.error('Login error:', error);
        }
      });
    }
  }

  checkUserExists(): void {
    const email = this.loginForm.get('email')?.value;
    if (email && this.loginForm.get('email')?.valid) {
      this.isCheckingUser = true;

      this.authService.checkUserExists(email).subscribe({
        next: (response) => {
          this.isCheckingUser = false;
          if (response.success && response.data) {
            // Podrías mostrar un mensaje indicando si el usuario existe o no
            console.log('Usuario existe:', response.data.exists);
          }
        },
        error: () => {
          this.isCheckingUser = false;
        }
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
}
