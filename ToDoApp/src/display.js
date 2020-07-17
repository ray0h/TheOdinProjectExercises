import { editTodo, deleteTodo, updateComplete, deleteProject } from './services';
import { displayCurrentProj } from './controllers';
import { format, parseISO } from 'date-fns';
 
const renderProjects = () => {
  // get projects from localStorage
  let projects = JSON.parse(window.localStorage.getItem('projects'));
  // clearout current project lists
  let projectList = document.getElementById("project-list");
  projectList.innerHTML = "";
  
  // generate list of projects 
  let list = document.createElement('div');
  projects.forEach(function (project, index) {
    let span = document.createElement('span');
    let link = document.createElement('div');
    // anchor.href="#";
    link.id = project.project;
    link.textContent = project.project;
    link.classList.add("project-link")
    link.onclick = displayCurrentProj;
    
    let delBtn = document.createElement('button');
    delBtn.id = project.project + index;
    delBtn.textContent="X";
    delBtn.onclick=deleteProject;
    span.appendChild(link);
    span.appendChild(delBtn);
    list.appendChild(span);
  })
  projectList.appendChild(list);
}

const renderCurrentTodos = () => {
  // get projects from localStorage
  let projects = JSON.parse(window.localStorage.getItem('projects'));

  // get current project from flagged className
  let current = Array.from(document.getElementsByClassName('active-project'))[0];
  if (current) {
    let project = projects.filter(item => item.project === current.id);
    let todos = project[0].todos;
    let todoList = document.getElementById('todos')
    todoList.innerHTML = "";
    
    todos.forEach(function(todo, index) {
      let bullet = document.createElement('div');
      bullet.classList.add("todo-item");
      bullet.id="todo-item" + index;
      
      let item = document.createElement('div');
      item.textContent = todo.item;
      item.id = "item" + index;
      
      let due = document.createElement('div');
      due.textContent = format(parseISO(todo.dueDate), 'MM/dd/yyyy');
      due.id = "dueDate" + index;
      
      let priority = document.createElement('div');
      priority.textContent = todo.priority;
      priority.id = "priority" + index;
      
      let complete = document.createElement('input');
      complete.type = "checkbox";
      complete.id = "check" + index;
      complete.checked = todo.complete;
      complete.onchange = updateComplete;
      if (complete.checked) {
        item.classList.add("complete");
        due.classList.add("complete");
        priority.classList.add("complete");
      }
      
      let editBtn = document.createElement('button');
      editBtn.textContent = "edit";
      editBtn.id="edit"+index;
      editBtn.classList.add("edit-btn");
      editBtn.onclick = editTodo;

      let delBtn = document.createElement('button');
      delBtn.textContent = "X";
      delBtn.id="delete"+index;
      delBtn.classList.add("del-btn");
      delBtn.onclick = deleteTodo;

      bullet.appendChild(item);
      bullet.appendChild(due);
      bullet.appendChild(priority);
      bullet.appendChild(complete);
      bullet.appendChild(editBtn);
      bullet.appendChild(delBtn);
      
      todoList.appendChild(bullet);
    })
  }
}

export {
  renderProjects,
  renderCurrentTodos,
}