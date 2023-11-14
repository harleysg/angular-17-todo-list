import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { Todo, UUID, Store, Complete, ToDoListType, ToDoList } from './todo.interface';

import { BaseComponent } from '@shared/components/base/base.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  providers: [CookieService],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent extends BaseComponent {
  todos: Todo[] = [];
  completed: Complete = {};
  deleted: Todo[] = [];
  store: { [key: string]: Todo[] | Todo } = {}
  list = {
    type: ToDoList,
    visible: ToDoList.all as ToDoListType
  }

  constructor(
    private cookieService: CookieService,
    private cd: ChangeDetectorRef
  ) {
    super(cd)
    this.getTodos()
    this.viewList()
  }

  add(event: SubmitEvent, text: string) {
    event.preventDefault()
    if (!text) return
    this.todos.push(this.todoFactory(text));
    this.setTodos();
    (event.target as HTMLFormElement)?.reset()
  }

  toggle(index: number, todo: Todo) {
    this.todos[index]
      ? (this.todos[index].done = !this.todos[index].done)
      : this.todos.push({ ...todo, done: false })

    this.completed[todo.id]
      ? (delete this.completed[todo.id])
      : (this.completed[todo.id] = { ...this.todos[index], done: true })

    this.setTodos()
  }

  done(id: UUID): void {
    this.todos = this.todos.filter(todo => {
      if (todo.id === id) this.deleted.push(todo)
      return todo.id !== id
    })

    this.setTodos()
  }

  viewList(type: ToDoListType = ToDoList.all): void {
    this.list.visible = type
  }

  getCompleteList(): Todo[] {
    return Object.values(this.completed).filter((todo: Todo) => todo.done).map(todo => todo)
  }

  private getTodos() {
    const store = this.cookieService.get('sg-todos')

    const { todos, completed, deleted } = store
      ? (JSON.parse(store) as Store)
      : { todos: [], completed: {}, deleted: [] }

    this.todos = todos
    this.completed = completed
    this.deleted = deleted
  }

  private setTodos() {
    this.cookieService.set('sg-todos', JSON.stringify({
      todos: this.todos,
      completed: this.completed,
      deleted: this.deleted
    }))

    this.cd.detectChanges()
  }

  private todoFactory(text: string): Todo {
    return ({ text, done: false, id: crypto.randomUUID() })
  }
}
