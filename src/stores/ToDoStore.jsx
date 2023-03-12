import { makeObservable, observable, action, computed, autorun } from 'mobx'

const initialTodos = ["Make coffee", "Make money", "Workout", "Reading 1 hour", "Read work emails"]
  .map((x, id) => ({
    task: x, 
    completed: false,
     id})
  );


class ObservableToDoStore {
  allTodos = []
  addTodoInput = ''
  filterType = 0; // 0 - all, 1 - completed, 2 - uncompleted
  
  constructor () {
    this.allTodos = initialTodos;
    this.toggleTodo(3);
    makeObservable(this, {
      allTodos: observable,
      addTodoInput: observable,
      filterType: observable,
      todos: computed,
      completedToDosCount: computed,
      nextTask: computed,
      todosLength: computed,
      addTodo: action,
      toggleTodo: action,
      updateSelect: action,
    });
    autorun(() => this.report());
    // this.addTodo("make coffee");
    // this.addTodo("make money");
  }

  get completedToDosCount() {
    console.log(this.allTodos.filter(todo => todo.completed).length || 0);
    return this.allTodos.filter(todo => todo.completed).length || 0;
  }

  get nextTask() {
    const task = this.allTodos.find(todo => todo.completed === false);
    return task ? task.task : 'chill, because u completed all the tasks'
  }

  get todosLength() {
    return this.allTodos.length;
  }

  get todos() {

    if(this.filterType === 0)
      return this.allTodos;
    if(this.filterType === 1)
      return this.allTodos.filter(x => x.completed)
    if(this.filterType === 2)
      return this.allTodos.filter(x => !x.completed)
  }

  addTodo(task) {
    console.log(this.allTodos)
    this.allTodos.push({
      task: task,
      completed: false,
      id: this.todosLength,
    });
  }

  deleteTodo(id) {
    this.allTodos = this.allTodos.filter((_, ind) => ind !== id);
    for(let i = 0; i < this.todosLength; i++) {
      this.todos[i].id = i;
    }
  }

  toggleTodo(id){
    this.allTodos[id].completed = !this.allTodos[id].completed;
  }

  updateInput(str) {
    this.addTodoInput = str;
  }

  updateSelect(ft) {
    this.filterType = ft;
  }

  get report() {
    if(this.todosLength === 0)
      return "No tasks in ToDo list"
    return `Next task is "${this.nextTask}". Progress ${this.completedToDosCount}/${this.todosLength}`
  }
}

export const observableToDoStore = new ObservableToDoStore();