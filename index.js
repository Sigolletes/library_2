// LIBRARY LOGIC

let library = [
  {id: 1, title: 'Title 1: a long title for this first example book', author: 'Author 1: also the first author has a long name', pages: 100, read: true},
  {id: 2, title: 'Title 2', author: 'Author 2', pages: 200, read: false},
  {id: 3, title: 'Title 3', author: 'Author 3', pages: 300, read: true},
  {id: 4, title: 'Title 4', author: 'Author 4', pages: 400, read: true},
  {id: 5, title: 'Title 5', author: 'Author 5', pages: 500, read: false},
  {id: 6, title: 'Title 6', author: 'Author 6', pages: 600, read: true},
  {id: 7, title: 'Title 7', author: 'Author 7', pages: 700, read: false}
];

const generateId = () => {
  const maxId = library.length > 0
    ? Math.max(...library.map(b => b.id))
    : 0
  return maxId + 1
}

function Book(title, author, pages, read) {
  this.id = generateId()
  this.author = author
  this.title = title 
  this.pages = pages
  this.read = read
}

function changeRead (id) {
  let index = library.findIndex((b) => b.id == id)
  if (index > -1) {
    library[index].read = !library[index].read
  }
  display()
}

function deleteBook (id) {
  let index = library.findIndex((b) => b.id == id)
  console.log('function delete', id, index);
  if (index > -1) {
    library.splice(index, 1)
  }
  display()
}

// FORM DOM VARIABLES
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")

// DOM VARIABLES
const main = document.querySelector("#main")
const addButton = document.querySelector("#addButton")
const returnButton = document.querySelector("#return")
const addDiv = document.querySelector("#addDiv")
const alertP = document.querySelector("#alert")

// RENDER FUNCTION
function display() {
  main.innerHTML = "";
  for (el of library) {
      let article = document.createElement("article");
      main.appendChild(article);
      article.classList.add("book");

      let div1 = document.createElement("div");
      article.appendChild(div1);
      div1.classList.add("div1");

      let aTitle = document.createElement("h2");
      div1.appendChild(aTitle);
      aTitle.innerText = el.title;

      let aAuthor = document.createElement("h3");
      div1.appendChild(aAuthor);
      aAuthor.innerText = el.author;
      aAuthor.style.fontStyle = "italic";

      let aPages = document.createElement("p");
      div1.appendChild(aPages);
      aPages.innerText = el.pages + " pages";

      let div2 = document.createElement("div");
      article.appendChild(div2);
      div2.classList.add("div2");

      let aRead = document.createElement("button");
      aRead.setAttribute("data-id", el.id);
      aRead.onclick = function () { 
        changeRead(aRead.dataset.id)
      }

      div2.appendChild(aRead);
      aRead.classList.add("aReadClass");
      if (el.read === true) {
          aRead.innerText = "Read";
          aRead.classList.add("green");
      } else {
          aRead.innerText = "Not read";
          aRead.classList.add("red");
      }

      let remove = document.createElement("button");
      remove.setAttribute("data-id", el.id);
      div2.appendChild(remove);
      remove.classList.add("removeButton");
      remove.innerText = "Remove";
      remove.onclick = function () { 
        deleteBook(remove.dataset.id)
      }
  }
}
display()

// EVENT LISTENERS

addButton.addEventListener("click", () => {
  addDiv.style.display = "grid"
})

returnButton.addEventListener("click", () => {
  addDiv.style.display = "none"
})

submit.addEventListener("click", (event) => {
  event.preventDefault()
  if (title.checkValidity() && author.checkValidity()) {
      let book = new Book(title.value, author.value, pages.value || "unknown", read.checked);
      library.push(book)
      addDiv.style.display = "none"
      display()
      title.value = ""
      author.value = ""
      pages.value = ""
      read.checked = false
  } else {
    alertP.innerText = "Title and Author are necessary"
    setTimeout(() => {
      alertP.innerText = ""
    }, 5000)
  }
})
