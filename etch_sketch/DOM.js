//Set up initial grid
document.getElementById("wrapper").style = "display: flex; justify-content: center;";

setUpGrid();

//Set up resizing button
document.getElementById("resize").addEventListener("click", () => {
  var reSize = prompt("Enter new grid value: (16-100)", 16);
  
  while (reSize < 0 || reSize > 100 || isNaN(reSize)) {
    console.log(reSize);
    reSize = prompt("Value out of range.  Enter new grid value: (16-100)", 16)
    console.log(reSize);
  }
  var container = document.querySelector(".container");
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
  setUpGrid(reSize);
});


function setUpGrid(res = 64) {
  var pixels = Math.ceil(320 / res);
  var container = document.querySelector(".container");
  container.style = `width: 320px; height: 320px; border: 1px solid #000; display: grid; grid-template-columns: repeat(${res}, auto); grid-template-rows: repeat(${res}, auto);`
  var original = `width: ${pixels}px; height: ${pixels}px; background-color: #ddd; `;
  var marked = `width: ${pixels}px; height: ${pixels}px; background-color: #000`;
  
  document.getElementById("cont-border").style = "border-radius: 10px; border: 30px solid red;";
  
  for (let i = 0; i < (res**2); i++) {
      var newBox = document.createElement("div");
      newBox.setAttribute("style", original);
      newBox.className = "box";
      container.appendChild(newBox);
  };

  //Create "markability"
  const box = document.querySelectorAll(".box");
  for (let i = 0; i < (res**2); i++) {
      box[i].addEventListener("mouseover", () => {
        box[i].setAttribute("style", marked)});
  };


  //Setup reset button
  var reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
      for (let i = 0; i < (res**2); i++) {
          box[i].setAttribute("style", original);
      };
  });
}
