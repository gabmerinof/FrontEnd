import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: async () => await import('./components/auth/login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/tasks/task-list/task-list.component').then(mod => mod.TaskListComponent),
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
