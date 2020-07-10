// data structure / content

// let myLibrary = [
//   {
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     pages: 296,
//     read: false
//   },
//   {
//     title: "The Dark Tower",
//     author: "Stephen King",
//     pages: 256,
//     read: false
//   },
//   {
//     title: "The Cat in the Hat",
//     author: "Dr. Suess",
//     pages: 19,
//     read: true
//   }
// ];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getLibrary() {
  let myLibrary = [];
  if(localStorage.length > 0) { 
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  }
  console.log(myLibrary)
  return myLibrary;
}

// rendering books in app

function makeCard(book) {
  let card = document.createElement("div");
  card.className = "card";
  let title = document.createElement("div");
  let author = document.createElement("div");
  let pages = document.createElement("div");
  let read = document.createElement("div");
  let readBox = document.createElement("input")
  let delBtn = document.createElement("button");
  
  title.textContent = `title: ${book.title}`;
  author.textContent = `author: ${book.author}`;
  pages.textContent = `pages: ${book.pages}`;
  read.textContent = "Read: ";
 
  readBox.type = "checkbox";
  readBox.checked = book.read;
  read.appendChild(readBox);

  delBtn.textContent = "Remove"
  delBtn.className = "redBtn"
  delBtn.value=book.slot
  delBtn.setAttribute("onclick", "delCard(event)")
  
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(delBtn);
  return card;
}
 
function render(library) {
  let shelf = document.getElementById("library")
  shelf.innerHTML = "";
  
  if(library.length === 0) {
    return;
  } 

  library.forEach((book, index) => {
    book.slot = index;
    let card = makeCard(book)
    shelf.appendChild(card)
  })
}

// new book form, adding new book

function displayForm() {
  let form = document.getElementById("book-form")
  let btn = document.getElementById("dispBtn")
  if (form.style.display === "none") {
    form.style.display = "";
    btn.textContent = "Cancel"
  } else {
    form.style.display = "none";
    btn.textContent = "Add Book"
  }
}

function addBookToLibrary(book, library) {
  library.push(book);
}

function submitBook(e) {
  e.preventDefault();
  let book = new Book(
    e.target.title.value,
    e.target.author.value,
    e.target.pages.value,
    e.target.read.clicked);
  addBookToLibrary(book, myLibrary);
  e.target.title.value = "",
  e.target.author.value = "",
  e.target.pages.value = "";
  e.target.read.value = false;
  displayForm();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}

// removing book from library
function delCard(e) {
  console.log(e.target.value);
  myLibrary.splice(e.target.value, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}

// execute relevant functions

let myLibrary = getLibrary();
console.log(myLibrary.length);
render(myLibrary);