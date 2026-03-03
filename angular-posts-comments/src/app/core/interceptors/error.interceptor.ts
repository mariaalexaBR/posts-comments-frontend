import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthModalService } from '../services/auth.modal.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const authModalService = inject(AuthModalService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Unexpected error';

      if (error.status === 0) {
        message = 'Cannot connect to server';
      }

      if (error.status === 401) {
        authModalService.open(); // 🔥 abre modal

        return authService.loginSuccess$.pipe(
          switchMap(() => {
            // 🔥 vuelve a intentar la request original
            const token = authService.getToken();

            const cloned = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });

            return next(cloned);
          })
        );
      }

      if (error.status === 404) {
        message = 'Resource not found';
      }

      if (error.status === 500) {
        message = 'Internal server error';
      }

      console.error('HTTP ERROR:', message, error);

      return throwError(() => ({
        status: error.status,
        message
      }));
    })
  );
};