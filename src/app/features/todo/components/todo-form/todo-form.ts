import { Component, EventEmitter, Output } from '@angular/core';
import { TodoType } from '../../service/todo-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  @Output() onTodoAdded = new EventEmitter<{title: string, status: string}>();
  @Output() onTodoSearch = new EventEmitter<string>();
  @Output() onTodoSortBy = new EventEmitter<string>();

  inputTask: string;
  searchTodo: string;
  isValidInput: boolean;
  
  addTodo() {
    const newTodo = {
      title: this.inputTask,
      status: 'Active'
    }
    this.onTodoAdded.emit(newTodo)
    this.inputTask = ''
  }

  onSearchTodo() {
    this.onTodoSearch.emit(this.searchTodo)
  }

  onSortTodo(e: any) {
    this.onTodoSortBy.emit(e.target.value)
  }

  isInputValid() {
    if (!this.inputTask) {
      this.isValidInput = false
    }
    this.isValidInput = true
  }
}
