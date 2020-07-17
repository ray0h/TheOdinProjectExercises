import { newTodo, newProject } from './factory';
import { toggleTodoForm, toggleNewProjectForm, toggleMarking, createEditForm } from './controllers';
import { renderCurrentTodos, renderProjects } from './display';

const updateAndRenderTodos = (fn) => {
  let update = fn;
  window.localStorage.setItem('projects', JSON.stringify(update))
  renderCurrentTodos();
}

const addNewTodo = (event) => {
  //create new todo object
  event.preventDefault();
  let newItem = event.target.newItem.value;
  let newDue = event.target.newDuedate.value;
  let newPriority = event.target.newPriority.value;
  let nextTodo = newTodo(newItem, newDue, newPriority);

  // id current project and push new todo into project todo list
  let currentProj = Array.from(document.getElementsByClassName('active-project'))[0];
  let projectList = JSON.parse(window.localStorage.getItem('projects'));
  let updated = projectList.map(function(project) {
    if (project.project === currentProj.id) {
      project.todos.push(nextTodo)
    } 
    return project;
  });
 
  // update localStorage and rerender Todos
  window.localStorage.setItem('projects', JSON.stringify(updated));
  toggleTodoForm();
  renderCurrentTodos();
}

const deleteTodo = (event) => {
  let conf = confirm("Delete todo?");
  if (conf) {
    let num = parseInt(event.target.id.slice(6))
    let currentProj = Array.from(document.getElementsByClassName('active-project'))[0];
    let projectList = JSON.parse(window.localStorage.getItem('projects'));
    let updated = projectList.map(function(project) {
      if (project.project === currentProj.id) {
        project.todos = project.todos.filter((todo, index) => index !== num);
      } 
      return project;
    });
    
    window.localStorage.setItem('projects', JSON.stringify(updated));
    renderCurrentTodos();
  }
}

const editTodo = (event) => {
  // id todo index, current project/todo
  let num = parseInt(event.target.id.slice(4));
  let currentProj = Array.from(document.getElementsByClassName('active-project'))[0];
  let projectList = JSON.parse(window.localStorage.getItem('projects'));
  let project = projectList.filter(project => project.project === currentProj.id);
  let currentTodo = project[0].todos.filter((todo, index) => index === num);
  
  // generate the edit form
  let editForm = createEditForm(num, currentTodo[0]);

  // insert form and hide original todo
  let currentNode = document.querySelector(`#todo-item${num}`)
  let parent = currentNode.parentNode;
  parent.insertBefore(editForm, currentNode);
  currentNode.classList.add("hidden");

  // implement self destruct button (cancel)
  let cancelBtn = document.getElementById(`editFormCancelBtn${num}`);
  cancelBtn.onclick = () => {
    currentNode.classList.remove("hidden");
    let editForm = document.getElementById(`editForm${num}`);
    parent.removeChild(editForm);
  }

  // implement save(update) button
  editForm = document.getElementById(`editForm${num}`);
  editForm.onsubmit = (event) => {
    event.preventDefault();
    let updatedItem = event.target[`itemEdit${num}`]['value'];
    let updatedDuedate = event.target[`dueDateEdit${num}`]['value'];
    let updatedPriority = event.target[`priorityEdit${num}`]['value'];
    let updatedTodo = newTodo(updatedItem, updatedDuedate, updatedPriority, currentTodo[0].complete);
    let updated = projectList.map(function(project) {
      if (project.project === currentProj.id) {
        project.todos = project.todos.map(function(todo, index) {
          if(index === num) {
            todo = updatedTodo;
          }
          return todo;
        });
      } 
      return project;
    });
    window.localStorage.setItem('projects', JSON.stringify(updated));
    renderCurrentTodos();
  }
}

const updateComplete = (event) => {
  let num = parseInt(event.target.id.slice(5));
  let currentProj = Array.from(document.getElementsByClassName('active-project'))[0];
  let projectList = JSON.parse(window.localStorage.getItem('projects'));
  let updated = projectList.map(function(project) {
    if (project.project === currentProj.id) {
      project.todos[num].complete = !project.todos[num].complete;
    } 
    return project;
  });
  toggleMarking(num);
  window.localStorage.setItem('projects', JSON.stringify(updated));
  renderCurrentTodos();
}

const addNewProject = (event) => {
  event.preventDefault();
  let title = event.target.newProject.value;
  let nextProject = newProject(title);

  let projectList = JSON.parse(window.localStorage.getItem('projects'));
  projectList.push(nextProject);
  window.localStorage.setItem('projects', JSON.stringify(projectList));

  toggleNewProjectForm();
  renderProjects();
}

const deleteProject = (event) => {
  let idLength = event.target.id.length;
  let conf = confirm("Delete project?");
  if (conf) {
    let num = parseInt(event.target.id.slice(idLength-1))
    let projectList = JSON.parse(window.localStorage.getItem('projects'));
    let updated = projectList.filter((project, index) => index !== num)
    
    window.localStorage.setItem('projects', JSON.stringify(updated));
    renderProjects();
  }
}

export {
  addNewTodo,
  deleteTodo,
  editTodo,
  addNewProject,
  deleteProject,
  updateComplete
}