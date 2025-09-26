import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateTaskRequest, Task } from '../../../core/models/api.models';
import { AuthService } from '../../../core/services/auth.service';
import { TaskService } from '../../../core/services/task.service';
import { TaskListCardComponent } from './task-list-card/task-list-card.component';
import { TaskListItemAddComponent } from './task-list-item-add/task-list-item-add.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatSnackBarModule, MatDialogModule, CommonModule, MatIconModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatCheckboxModule, TaskListCardComponent, MenubarModule, BadgeModule,
    RippleModule, PaginatorModule, ButtonModule, ToolbarModule, TooltipModule, ConfirmDialogModule, TaskListItemAddComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [ConfirmationService]
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];

  private destroy$ = new Subject<void>();
  private taskService: TaskService = inject(TaskService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  isLoading = false;
  isSubmitting = false;
  isPending = true;
  dialogVisible = false;
  currentUser = this.authService.getCurrentUser();
  first: number = 0;
  rows: number = 6;
  totalCount: number = 0;
  items: MenuItem[] = [];
  selectedTask: Task | null = null;

  ngOnInit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    setTimeout(() => {
      this.loadTasks();
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getUserTasks(this.currentUser!.id, this.first.toString(), this.rows.toString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success && response.data) {
            this.tasks = response.data.tasks;
            this.totalCount = response.data.count;

            this.items = [
              {
                label: 'Pendientes',
                icon: 'pi pi-calendar-clock',
                styleClass: 'my-highlight-class',
                badge: this.pendingTasksCount.toString(),
                command: () => {
                  this.isPending = true;
                  this.items[0].styleClass = 'my-highlight-class';
                  this.items[1].styleClass = '';
                }
              },
              {
                label: 'Completadas',
                icon: 'pi pi-calendar',
                badge: this.completedTasksCount.toString(),
                command: () => {
                  this.isPending = false;
                  this.items[0].styleClass = '';
                  this.items[1].styleClass = 'my-highlight-class';
                }
              }
            ]
          } else {
            this.snackBar.open(
              response.error || 'Error al cargar las tareas',
              'Cerrar',
              { duration: 5000 }
            );
          }
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.snackBar.open(
            'Error de conexión. Intenta nuevamente.',
            'Cerrar',
            { duration: 5000 }
          );
        }
      });
  }

  onSubmit(taskForm: FormGroup): void {
    if (taskForm.valid && this.currentUser) {
      this.isSubmitting = true;
      console.log(this.selectedTask);

      if (this.selectedTask) {
        this.selectedTask.title = taskForm.get('title')?.value.trim();
        this.selectedTask.description = taskForm.get('description')?.value.trim() || '';
        this.updateTask(this.selectedTask);
      } else
        this.createTask(taskForm);
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.loadTasks();
  }

  toggleTaskCompletion(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.updateTask(updatedTask);
  }

  showDialogEdit() {
    this.selectedTask = null;
    this.dialogVisible = true;
  }

  clickOnEdit(event: Task) {
    this.selectedTask = event;
    this.dialogVisible = true;
  }

  createTask(taskForm: FormGroup) {
    const taskData: CreateTaskRequest = {
      title: taskForm.get('title')?.value.trim(),
      description: taskForm.get('description')?.value.trim() || '',
      userId: this.currentUser!.id
    };

    const validation = this.taskService.validateTaskData(taskData);
    if (!validation.isValid) {
      this.snackBar.open(validation.errors[0], 'Cerrar', { duration: 5000 });
      this.isSubmitting = false;
      return;
    }

    this.taskService.createTask(taskData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success && response.data) {
            this.loadTasks();
            taskForm.reset();

            this.dialogVisible = false;
            this.snackBar.open('Tarea creada exitosamente', 'Cerrar', { duration: 3000 });
          } else {
            this.snackBar.open(
              response.error || 'Error al crear la tarea',
              'Cerrar',
              { duration: 5000 }
            );
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            'Error de conexión. Intenta nuevamente.',
            'Cerrar',
            { duration: 5000 }
          );
          console.error('Error creating task:', error);
        }
      });
  }

  updateTask(task: Task): void {
    const updateData = {
      title: task.title,
      description: task.description,
      completed: task.completed
    };

    this.taskService.updateTask(task.id, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
              this.tasks[index] = response.data!.task;

              if (this.isSubmitting) {
                this.isSubmitting = false;
                this.snackBar.open('Tarea actualizada exitosamente', 'Cerrar', { duration: 3000 });
                this.dialogVisible = false;
              } else {
                this.items[0].badge = this.pendingTasksCount.toString();
                this.items[1].badge = this.completedTasksCount.toString();
              }
            }
          } else {
            this.isSubmitting = false;
            this.snackBar.open(
              response.error || 'Error al actualizar la tarea',
              'Cerrar',
              { duration: 5000 }
            );

            this.loadTasks();
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            'Error de conexión. Intenta nuevamente.',
            'Cerrar',
            { duration: 5000 }
          );
          this.loadTasks();
        }
      });
  }

  deleteTaskHandler(event: any) {
    this.confirmationService.confirm({
      target: event!.button,
      message: '¿Está seguro que desea eliminar la tarea?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectIcon: 'pi pi-times',
      acceptLabel: 'Borrar',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.taskService.deleteTask(event!.tasks!.id, this.currentUser!.id)
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.loadTasks();
                this.snackBar.open('Tarea eliminada exitosamente', 'Cerrar', { duration: 3000 });
              } else {
                this.snackBar.open(
                  response.error || 'Error al eliminar la tarea',
                  'Cerrar',
                  { duration: 5000 }
                );
              }
            },
            error: (error) => {
              this.snackBar.open(
                'Error de conexión. Intenta nuevamente.',
                'Cerrar',
                { duration: 5000 }
              );
            }
          });
      },
      reject: () => {

      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get pendingTasksCount(): number {
    return this.tasks.filter(t => !t.completed).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(t => t.completed);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(t => !t.completed);
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
