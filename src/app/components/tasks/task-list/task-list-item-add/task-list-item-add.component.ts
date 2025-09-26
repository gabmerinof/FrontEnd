import { Component, EventEmitter, inject, Input, model, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from 'primeng/inputtext';
import { Task } from '../../../../core/models/api.models';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-list-item-add',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, CardModule, FloatLabelModule, ButtonModule],
  templateUrl: './task-list-item-add.component.html',
  styleUrl: './task-list-item-add.component.scss'
})
export class TaskListItemAddComponent {
  dialogItemVisible = model(false);
  @Input() task: Task | null = null;
  @Output() submitGroupForm = new EventEmitter<FormGroup>();

  isEdit = false;
  dialogTitle?: string;
  taskForm?: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.isEdit = false;
    this.dialogTitle = "Agregar Tarea"
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]]
    });

    setTimeout(() => {
      if (this.task) {
        this.isEdit = true;
        this.dialogTitle = "Editar Tarea";
        this.taskForm!.patchValue(this.task);
      }
    }, 100);
  }

  onSubmit() {
    this.submitGroupForm.emit(this.taskForm);
  }
}
