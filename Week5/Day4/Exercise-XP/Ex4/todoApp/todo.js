export class TodoList{
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    markTaskAsComplete(index) {
        if (this.tasks[index]) {
            this.tasks[index].completed = true;
        }
    }
    
    removeTastk(index) {
        if (this.tasks[index]) {
            this.tasks.splice(index, 1);
        }
    }
  

}