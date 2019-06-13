import { Component, OnInit, NgModule } from '@angular/core';

import { Todo } from 'src/app/model/todo';
import { TODOARR } from 'src/app/model/mock-todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = TODOARR;
  todoListDone: Todo[];
  todoListToDo: Todo[];

  task: string = '';
  category: string = '';
  constructor() {}

  delete(todo: Todo) {
    this.todoList.splice(this.todoList.indexOf(todo), 1);
    this.updateArrays();
    this.updateStorage();
  }

  add() {
    if (this.task.length > 0) {
      if (this.category.length > 0) {
        this.todoList.push({
          content: this.task,
          completed: false,
          category: this.category
        });
      } else {
        this.todoList.push({ content: this.task, completed: false });
      }
    }

    this.task = '';
    this.category = '';
    this.updateArrays();
    this.updateStorage();
  }

  updateStorage() {
    this.updateArrays();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  updateArrays() {
    this.todoListDone = this.todoList.filter(doneElem => doneElem.completed);
    this.todoListToDo = this.todoList.filter(doneElem => !doneElem.completed);
  }

  ngOnInit() {
    if (localStorage.getItem('todoList')) {
      this.todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    this.updateArrays();
  }
}
