import { Component, inject } from '@angular/core';
import { TodoService } from '../../service/todo-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  todoService = inject(TodoService)

  taskLength = 0;

  ngOnInit() {
    this.todoService.getTodos().pipe(map(todo => todo.length)).subscribe(length => this.taskLength = length)
  }
}
