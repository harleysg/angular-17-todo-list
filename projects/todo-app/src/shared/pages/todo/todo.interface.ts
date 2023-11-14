export interface Todo {
  done: boolean,
  text: string,
  id: UUID
}

export interface Complete {
  [key: UUID]: Todo
}

export interface Store {
  todos: Todo[],
  completed: Complete,
  deleted: Todo[],
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type ToDoListType = 'all' | 'completed' | 'deleted'

export enum ToDoList {
  all = 'all',
  completed = 'completed',
  deleted = 'deleted'
}
