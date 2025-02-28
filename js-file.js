// DOM elements
const card = document.querySelector(".card");
const dialog = document.querySelector("dialog");
const bookForm = document.querySelector("#book-info");
const close = document.querySelector("#close");
const addBook = document.querySelector("#add");
const form = document.querySelector("#form");
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let read = document.getElementById("read");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`); 
    }
  }

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function reset() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.value = '';
}

close.addEventListener("click", () => {
  dialog.close();
  reset();
})

bookForm.addEventListener("click", () => {
    dialog.showModal();
})

addBook.addEventListener("click", () => {
    title = title.value;
    author = author.value;
    pages = pages.value;
    read = read.value;
    console.log(title);
    addBookToLibrary(title, author, pages, read);
})

