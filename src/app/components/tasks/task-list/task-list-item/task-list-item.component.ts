import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardModule } from 'primeng/card';
import { Task } from '../../../../core/models/api.models';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CardModule, CommonModule, MatCheckboxModule, ButtonModule, MatIconModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() task: Task | undefined;
  @Output() deleteTask = new EventEmitter<{ tasks: Task | undefined, button: EventTarget | null }>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() toggleTaskCompletion = new EventEmitter<Task>();

  private taskService: TaskService = inject(TaskService);

  deleteItemTask(event: Event) {
    this.deleteTask.emit({ tasks: this.task, button: event.target });
  }

  toggleTask(): void {
    this.toggleTaskCompletion.emit(this.task!);
  }

  formatDate(dateString?: string): string {

    return dateString ? this.taskService.formatDate(dateString) : dateString ?? "";
  }

  clickOnEdit() {
    this.editTask.emit(this.task);
  }
}
