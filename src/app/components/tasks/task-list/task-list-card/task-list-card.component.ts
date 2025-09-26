import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Task } from '../../../../core/models/api.models';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

@Component({
  selector: 'app-task-list-card',
  standalone: true,
  imports: [CommonModule, ConfirmPopupModule, TaskListItemComponent, MatCardModule],
  templateUrl: './task-list-card.component.html',
  styleUrl: './task-list-card.component.scss'
})
export class TaskListCardComponent {
  @Input() tasks: Task[] = [];
  @Output() deleteTask = new EventEmitter<{ tasks: Task | undefined, button: EventTarget | null }>();
  @Output() toggleTaskCompletion = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();

  deleteItemTask(event: { tasks: Task | undefined, button: EventTarget | null }) {
    this.deleteTask.emit(event);
  }

  clickOnEdit(event: Task) {
    this.editTask.emit(event);
  }

  toggleTask(event: Task): void {
    this.toggleTaskCompletion.emit(event);
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
