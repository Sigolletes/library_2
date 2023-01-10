// LIBRARY LOGIC
let library = [];

const generateId = () => {
  const maxId = library.length > 0
    ? Math.max(...library.map(b => b.id))
    : 0
  return maxId + 1
}

function Book(author, title, pages, read) {
  this.id = generateId()
  this.author = author
  this.title = title 
  this.pages = pages
  this.read = read
  this.changeRead = function() {
    read = !read
  }
}

function bookManager() {
  const add = (book) => {
    library.push(book)
  }

  const deleteBook = (id) => {
    let index = library.findIndex((b) => b.id === id)

    if (index > -1) {
      library.splice(index, 1)
    }
  }

  return {
    add,
    deleteBook
  }
}

// Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”.

// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want. You will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. If you’ve done the bonus section for the calculator assignment, you might be familiar with event.preventDefault()

// FORM DOM VARIABLES
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const pages = document.querySelector("#pages")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")

// DOM VARIABLES
const main = document.querySelector("#main")

// RENDER FUNCTION
function display() {
  main.innerHTML = "";
  for (book of library) {
      let article = document.createElement("article");
      main.appendChild(article);
      article.classList.add("book");

      let div1 = document.createElement("div");
      article.appendChild(div1);
      div1.classList.add("div1");

      let aTitle = document.createElement("h2");
      div1.appendChild(aTitle);
      aTitle.innerText = el.title;

      let aAuthor = document.createElement("h2");
      div1.appendChild(aAuthor);
      aAuthor.innerText = el.author;
      aAuthor.style.fontStyle = "italic";

      let aPages = document.createElement("h2");
      div1.appendChild(aPages);
      aPages.innerText = el.pages;

      let div2 = document.createElement("div");
      article.appendChild(div2);
      div2.classList.add("div2");

      let aRead = document.createElement("button");
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
     /*  remove.setAttribute("data-id", book.id); */
      div2.appendChild(remove);
      remove.classList.add("removeButton");
      remove.innerText = "Remove";
      remove.onclick = bookManager.deleteBook(book.id);
  }
}
display()

// EVENT LISTENERS

submit.addEventListener("click", () => {
  if (title.checkValidity() && author.checkValidity()) {
      let book = new Book(title.value, author.value, pages.value || "unknown", read.checked)
      bookManager.add(book)

     // display library

  } else {
      // alert needed values
  }
  title.value = ""
  author.value = ""
  pages.value = ""
  read.checked = false
})

// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

// Add a button on each book’s display to change its read status.
//To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
