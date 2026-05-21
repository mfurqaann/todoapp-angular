import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';

export interface TodoType {
  id: string;
  title: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private allTodos: TodoType[] = []  
  private todosBehaviourSubject = new BehaviorSubject<TodoType[]>([]);

  private currentSearch = ''
  private searchQuery$ = new BehaviorSubject<string>('');
  private sortBy$ = new BehaviorSubject<string>('');

  todos$ = combineLatest([this.todosBehaviourSubject, this.searchQuery$, this.sortBy$]).pipe(
    map(([todos, query, sortBy]) => {
      let filtered = [...todos];

      if (query) {
        filtered = filtered.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))
      }

      return [...filtered].sort((a,b) => {
        const valA = a[sortBy]
        const valB = b[sortBy]
        if (typeof(valA) === 'string') {
          return valA.localeCompare(valB)
        }

        return valA - valB
      })
    })
  )

  getTodos() {
    return this.todos$
  }

  createTodo(title: string) {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      status: false
    }
    
    const currentTodos = this.todosBehaviourSubject.value
    this.allTodos = [...currentTodos, newTodo]
    this.todosBehaviourSubject.next(this.allTodos)
  }

  deleteTodo(id: string) {
    this.allTodos = this.allTodos.filter((todo) => todo.id !== id)
    this.todosBehaviourSubject.next(this.allTodos)

    this.searchTasks(this.currentSearch)
  }

  searchTasks(query: string) {
    this.searchQuery$.next(query)
  }

  sortTodo(sortBy: string) {
    this.sortBy$.next(sortBy);
  }

  toggleTodo(id: string) {
    this.allTodos = this.allTodos.map((todo) => {
      return todo.id === id ? {...todo, status: !todo.status} : todo
    })

    this.todosBehaviourSubject.next(this.allTodos);
  }
}
