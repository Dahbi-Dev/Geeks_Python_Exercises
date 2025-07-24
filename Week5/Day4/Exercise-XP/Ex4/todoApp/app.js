import {TodoList} from './todo.js';

const todoList = new TodoList();
todoList.addTask({ title: 'Learn JavaScript', completed: false });
todoList.addTask({ title: 'Build a Todo App', completed: false });
todoList.addTask({ title: 'Test the App', completed: false });
todoList.markTaskAsComplete(0);
todoList.removeTastk(1);
console.log(todoList.getTasks());
