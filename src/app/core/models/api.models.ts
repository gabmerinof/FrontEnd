export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  exists: boolean;
  token: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  userId: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface UserResponse {
  user: User;
  token: string;
  message: string;
}

export interface TasksResponse {
  tasks: Task[];
  count: number;
}

export interface TaskResponse {
  task: Task;
  message: string;
}
