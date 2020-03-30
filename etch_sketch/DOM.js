function setUpGrid(res = 64, func = base) {
  var pixels = (320 / res);
  var resolution = `width: ${pixels}px; height: ${pixels}px;`;

  var container = document.querySelector(".container");
  container.style = `display: grid; grid-template-columns: repeat(${res}, auto); grid-template-rows: repeat(${res}, auto);`
  
  
  for (let i = 0; i < (res**2); i++) {
      var newBox = document.createElement("div");
      newBox.setAttribute("style", resolution);
      newBox.id = `${i}`;
      newBox.classList.add("box");
      newBox.classList.add("mark0");
      newBox.addEventListener("mouseover", func);
      container.appendChild(newBox);
  };
}

function clearGrid() {
  var container = document.querySelector(".container");
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  };
}

//marking function - default 0 -> 100% fill
function base(e) {
  box = e.target;
  box.classList.add("mark100");
  box.classList.remove("mark0");
}

//marking function - gradually fill 0 -> 100% in 10% increments
function darken(e) {
  box = e.target;
  list = box.classList;
  for (j=0; j<list.length; j++) {
    switch(list[j]){
      case "mark0":
        box.classList.add("mark10");
        box.classList.remove("mark0");
        break;
      case "mark10":
        box.classList.add("mark20");
        box.classList.remove("mark10");
        break;
      case "mark20":
        box.classList.add("mark30");
        box.classList.remove("mark20");
        break;
      case "mark30":
        box.classList.add("mark40");
        box.classList.remove("mark30");
        break;
      case "mark40":
        box.classList.add("mark50");
        box.classList.remove("mark40");
        break;
      case "mark50":
        box.classList.add("mark60");
        box.classList.remove("mark50");
        break;
      case "mark60":
        box.classList.add("mark70");
        box.classList.remove("mark60");
        break;
      case "mark70":
        box.classList.add("mark80");
        box.classList.remove("mark70");
        break;
      case "mark80":
        box.classList.add("mark90");
        box.classList.remove("mark80");
        break;
      case "mark90":
        box.classList.add("mark90");
        box.classList.remove("mark100");
        break;
    }
  }
}

//marking function to fill in random colors.
function randColor(e) {
  box = e.target;
  var x = Math.floor(Math.random()*256);
  var y = Math.floor(Math.random()*256);
  var z = Math.floor(Math.random()*256);
  var color = `rgb(${x},${y},${z})`
  box.style.backgroundColor = color;
}

//Set up initial grid
setUpGrid();

//Setup reset button
document.getElementById("reset").addEventListener("click", () => {
    var box = document.querySelectorAll(".box");
    for (let i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = "";
        box[i].classList.remove(...box[i].classList);
        box[i].classList.add("box");
        box[i].classList.add("mark0");
    };
});

//Set up resizing button
document.getElementById("resize").addEventListener("click", () => {
  var reSize = prompt("Enter new grid value: (16-100)", 16);
  
  while (reSize < 16 || reSize > 100 || isNaN(reSize) || reSize.length == 0) {
    reSize = prompt("Value out of range.  Enter new grid value: (16-100)", 16);
  }
  clearGrid();
  setUpGrid(reSize);
});

//Set up Graduated Darkening Button 
document.getElementById("gradDark").addEventListener("click", () => {
  var box = document.querySelectorAll(".box");
  var res = Math.sqrt(box.length);
  clearGrid();
  setUpGrid(res, darken); 
});

//Set up Default Button 
document.getElementById("default").addEventListener("click", () => {
  var box = document.querySelectorAll(".box");
  var res = Math.sqrt(box.length)
  clearGrid();
  setUpGrid(res, base); 
});

//Set up Random Color Button 
document.getElementById("random").addEventListener("click", () => {
  var box = document.querySelectorAll(".box");
  var res = Math.sqrt(box.length);
  clearGrid();
  setUpGrid(res, randColor); 
});