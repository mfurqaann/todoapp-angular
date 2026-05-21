import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { TodoType } from '../../service/todo-service';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input() todos: TodoType[] = []
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() toggleTodo = new EventEmitter<string>();

  onDeleteTodo(id: string) {
    this.deleteTodo.emit(id);
  }

  onToggleTodo(id: string) {
    this.toggleTodo.emit(id);
  }

}
