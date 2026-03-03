import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Unexpected error';

      if (error.status === 0) {
        message = 'Cannot connect to server';
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