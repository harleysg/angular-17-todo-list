import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { Todo, UUID, Store, Complete, ToDoListType, ToDoList } from './todo.interface';

import { BaseComponent } from '@shared/components/base/base.component';
import { IconComponent } from '@shared/components';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [CookieService],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent extends BaseComponent {
  showIcon = false
  todos: Todo[] = [];
  completed: Complete = {};
  deleted: Todo[] = [];
  store: { [key: string]: Todo[] | Todo } = {}
  list = {
    type: ToDoList,
    visible: ToDoList.all as ToDoListType
  }
  iconCode!: string;

  constructor(
    private cookieService: CookieService,
    private cd: ChangeDetectorRef
  ) {
    super(cd)
    this.getTodos()
    this.viewList()

    this.iconCode = `<svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" class="y0nyIc NMm5M">
      <rect fill="none" height="24" width="24"></rect>
      <path fill="currentColor" d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z"></path>
    </svg>`
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

  toggleIcon() {
    this.showIcon = !this.showIcon

    this.cd.detectChanges()
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
