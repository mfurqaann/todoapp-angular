import { Component, inject } from '@angular/core';
import { TodoList } from '../../components/todo-list/todo-list';
import { TodoForm } from "../../components/todo-form/todo-form";
import { TodoService, TodoType } from '../../service/todo-service';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-page',
  imports: [TodoForm, TodoList, Header, Footer, AsyncPipe],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage {

  todoService = inject(TodoService)

  todos: TodoType[] = []
  todosDisplay: TodoType[] = []
  todos$: Observable<TodoType[]>;
  
  ngOnInit() {
    this.todos$ = this.todoService.todos$;
  }

  addTodo(todo: {title: string, status: string}) {
    this.todoService.createTodo(todo.title)
  }
  
  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  onSearchTodo(query: string) {
    this.todoService.searchTasks(query)
  }

  onSortTodo(sortBy: string) {
    console.log(sortBy)
    this.todoService.sortTodo(sortBy);
  }

  onToggleTodo(id: string) {
    this.todoService.toggleTodo(id)
  }
}
