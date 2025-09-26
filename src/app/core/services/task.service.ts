import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CreateTaskRequest, TaskResponse, TasksResponse, UpdateTaskRequest } from '../models/api.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apiService: ApiService) { }

  getUserTasks(userId: string, first:string, row: string): Observable<ApiResponse<TasksResponse>> {
    return this.apiService.get<ApiResponse<TasksResponse>>(`/tasks/user/${userId}/${first}/${row}`);
  }

  geTask(taskId: string): Observable<ApiResponse<TasksResponse>> {
    return this.apiService.get<ApiResponse<TasksResponse>>(`/tasks/task/${taskId}`);
  }
  createTask(taskData: CreateTaskRequest): Observable<ApiResponse<TaskResponse>> {
    return this.apiService.post<ApiResponse<TaskResponse>>('/tasks', taskData);
  }

  updateTask(taskId: string, updateData: UpdateTaskRequest): Observable<ApiResponse<TaskResponse>> {
    return this.apiService.put<ApiResponse<TaskResponse>>(`/tasks/${taskId}`, updateData);
  }

  deleteTask(taskId: string, userId: string): Observable<ApiResponse<{ message: string }>> {
    return this.apiService.delete<ApiResponse<{ message: string }>>(`/tasks/${taskId}`);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  validateTaskData(taskData: CreateTaskRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!taskData.title || taskData.title.trim().length === 0) {
      errors.push('El título es requerido');
    }

    if (taskData.title && taskData.title.trim().length > 200) {
      errors.push('El título no puede tener más de 200 caracteres');
    }

    if (taskData.description && taskData.description.length > 1000) {
      errors.push('La descripción no puede tener más de 1000 caracteres');
    }

    if (!taskData.userId) {
      errors.push('ID de usuario es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
