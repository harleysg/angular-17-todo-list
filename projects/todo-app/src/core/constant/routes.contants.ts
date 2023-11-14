const _ROUTES = {
  home: {
    path: '',
    title: 'Home',
    loadComponent: () => import('../../shared/pages/salut/salut.component').then(m => m.SalutComponent)
  },
  todo: {
    path: 'todo',
    title: 'Todos',
    loadComponent: () => import('../../shared/pages/todo/todo.component').then(m => m.TodoComponent)
  },
  notFound: {
    path: '**',
    loadComponent: () => import('../../shared/pages/salut/salut.component').then(m => m.SalutComponent)
  }
}

export const ROUTES = [
  _ROUTES.home,
  _ROUTES.todo,
  _ROUTES.notFound
]

export const MENU = {
  home: {
    label: _ROUTES.home.title,
    link: _ROUTES.home.path
  },
  todo: {
    label: _ROUTES.todo.title,
    link: _ROUTES.todo.path
  }
}
