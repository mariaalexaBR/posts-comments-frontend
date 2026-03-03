import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private TOKEN_KEY = 'token';

  loginSuccess$ = new Subject<void>(); // 👈 notifica login exitoso

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loginSuccess$.next(); // 👈 dispara evento
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}