import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoType } from '../../service/todo-service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [NgClass, FormsModule, TitleCasePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo: TodoType
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() toggleTodo = new EventEmitter<string>();

  onClickTodo(todo: TodoType) {
    this.deleteTodo.emit(todo.id)
  }

  onToggleTodo(todo: TodoType) {
    this.toggleTodo.emit(todo.id);
  }
}
