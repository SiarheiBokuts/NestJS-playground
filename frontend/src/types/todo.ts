export interface CreateTodoDto {
  title: string;
}

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  completedAt: string;
  createdAt: string;
}
