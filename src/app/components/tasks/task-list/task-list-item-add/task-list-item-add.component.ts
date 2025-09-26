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
/**
 * Componente para agregar o editar tareas mediante un diálogo modal
 * Maneja la creación y edición de tareas a través de un formulario reactivo
 */
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
    this.dialogTitle = "Agregar Tarea";

    /**
  * Crea el formulario reactivo con validaciones
  * - title: Requerido y máximo 200 caracteres
  * - description: Opcional con máximo 1000 caracteres
  */
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]]
    });

    /**
  * Timeout para manejar la inicialización asíncrona de la tarea de entrada
  * Permite que Angular complete el ciclo de detección de cambios antes de evaluar
  */
    setTimeout(() => {
      if (this.task) {
        this.isEdit = true;
        this.dialogTitle = "Editar Tarea";
        this.taskForm!.patchValue(this.task);
      }
    }, 100);
  }

  /**
 * Maneja el envío del formulario cuando es válido
 * Emite el formulario al componente padre para su procesamiento
 */
  onSubmit() {
    this.submitGroupForm.emit(this.taskForm);
  }
}
