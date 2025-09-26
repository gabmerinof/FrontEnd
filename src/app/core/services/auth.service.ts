import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { User, UserResponse, ApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly USER_KEY = 'currentUser';
  private apiService: ApiService = inject(ApiService);

  constructor() {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string): Observable<ApiResponse<UserResponse>> {
    return this.apiService
      .post<ApiResponse<UserResponse>>('/users/find-or-create', { email })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setCurrentUser(response.data.user);
          }
        })
      );
  }

  checkUserExists(email: string): Observable<ApiResponse<{ exists: boolean; user: User }>> {
    return this.apiService.get<ApiResponse<{ exists: boolean; user: User }>>(
      `/users/check/${encodeURIComponent(email)}`
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
