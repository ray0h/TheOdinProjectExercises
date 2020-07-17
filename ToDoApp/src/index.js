import { renderProjects, renderCurrentTodos } from './display';
import { toggleTodoForm, toggleNewProjectForm } from './controllers';
import { addNewTodo, addNewProject } from './services';

let hardSetProjects = [
  {
    project: "Work ToDos",
    todos: [
      {
        item: "email boss",
        dueDate: "2020-07-16",
        complete: false,
        priority: "high"
      },
      {
        item: "call accounting",
        dueDate: "2020-07-16",
        complete: false,
        priority: "med"
      }
    ]
  },
  {
    project: "Vacation Planning",
    todos: [
      {
        item: "check funds",
        dueDate: "2020-07-16",
        complete: false,
        priority: "high"
      }
    ]
  },
  {
    project: "Workout List",
    todos: [
      {
        item: "50 burpees",
        dueDate: "2020-07-16",
        complete: false,
        priority: "none"
      },
      {
        item: "run 3 miles",
        dueDate: "2020-07-16",
        complete: false,
        priority: "none"
      }
    ]
  }
]

let storage = window.localStorage.getItem('projects');
if (!storage) {
  window.localStorage.setItem('projects', JSON.stringify(hardSetProjects));
}

renderProjects();
renderCurrentTodos();

let newTodoBtn = document.getElementById("addNewTodo");
newTodoBtn.onclick = toggleTodoForm;

let cancelTodoFormBtn = document.getElementById("closeTodoForm");
cancelTodoFormBtn.onclick = toggleTodoForm;

let newProjBtn = document.getElementById("addNewProject");
newProjBtn.onclick = toggleNewProjectForm;

let cancelProjFormBtn = document.getElementById("closeProjForm");
cancelProjFormBtn.onclick = toggleNewProjectForm;

let todoForm = document.getElementById("newTodoForm");
todoForm.onsubmit=addNewTodo;

let projForm = document.getElementById("newProjForm");
projForm.onsubmit=addNewProject;