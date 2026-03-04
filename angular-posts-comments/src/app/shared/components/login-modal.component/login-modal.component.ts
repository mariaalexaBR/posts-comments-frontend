import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { AuthModalService } from '../../../core/services/auth.modal.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  authModalService = inject(AuthModalService);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.http.post<any>('/auth/login', this.form.value)
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.data.access_token);
          this.authModalService.close();
        }
      });
  }
}