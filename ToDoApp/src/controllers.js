import { renderCurrentTodos, renderProjects } from './display';

const displayCurrentProj = (event) => {
  let clickedProject = event.target.id

  // remove active-project class from other ids
  let pastProject = Array.from(document.getElementsByClassName("active-project"))[0]
  if(pastProject) {
    pastProject.classList.remove("active-project");
  }
  
  // add active-project to current element
  let currentProject = document.getElementById(clickedProject);
  currentProject.classList.add("active-project");
  
  // rerender new project todos
  renderCurrentTodos();
}

const toggleTodoForm = () => {
  let formCont = document.getElementById("todoFormCont");
  let form = document.getElementById("newTodoForm")
  let todos = document.getElementById("todo-container");
  formCont.classList.toggle("hidden");
  todos.classList.toggle("hidden");
  form.reset();
}

const toggleNewProjectForm = () => {
  let formCont = document.getElementById("projFormCont");
  let form = document.getElementById("newProjForm");
  let projects = document.getElementById("project-container");
  projects.classList.toggle("hidden");
  formCont.classList.toggle("hidden");
  form.reset();
}

const toggleMarking = (num) => {
  let item = document.getElementById('item'+num);
  let dueDate = document.getElementById('dueDate'+ num);
  let priority = document.getElementById('priority'+num);
  item.classList.toggle("complete");
  dueDate.classList.toggle("complete");
  priority.classList.toggle("complete");
}

const createEditForm = (index, todo) => {
  let editForm = document.createElement('form');
  editForm.setAttribute('class', 'todo-item');
  editForm.id="editForm"+index;
  let itemEdit = document.createElement('input');
  itemEdit.type = "text";
  itemEdit.id = "itemEdit"+index;
  itemEdit.value = todo.item;

  let dueDateEdit = document.createElement('input');
  dueDateEdit.type = "date";
  dueDateEdit.id = "dueDateEdit"+index;
  dueDateEdit.value = todo.dueDate;

  let priorityEdit = document.createElement('select')
  let choices = ['none', 'high', 'med', 'low'];
  choices.forEach(function(opt) {
    let option = document.createElement('option');
    option.textContent=opt;
    option.value=opt;
    if (opt === todo.priority) {
      option.setAttribute("selected", "selected");
    }
    priorityEdit.appendChild(option);
  })
  priorityEdit.id="priorityEdit"+index;

  let saveBtn = document.createElement('button');
  saveBtn.textContent="Save";
  let cancelBtn = document.createElement('button');
  cancelBtn.id = "editFormCancelBtn"+index;
  cancelBtn.textContent="Cancel";

  editForm.appendChild(itemEdit);
  editForm.appendChild(dueDateEdit);
  editForm.appendChild(priorityEdit);
  editForm.appendChild(saveBtn);
  editForm.appendChild(cancelBtn);

  return editForm;
}

export {
  displayCurrentProj,
  toggleTodoForm,
  toggleNewProjectForm,
  toggleMarking,
  createEditForm
}
