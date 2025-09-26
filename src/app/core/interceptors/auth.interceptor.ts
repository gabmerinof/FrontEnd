import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.getCurrentUser();

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        'User-Id': currentUser.id,
        'Authorization': `Bearer ${currentUser.token}`
      }
    });
  }

  return next(req);
};
