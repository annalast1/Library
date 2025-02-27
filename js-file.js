function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`); 
    }
  }

/* const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet") */

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const card = document.querySelector(".card");
const dialog = document.querySelector("dialog")
const bookForm = document.querySelector("#book-info");
bookForm.addEventListener("click", () => {
    dialog.showModal();
})
const addBook = Document.querySelector("#add");
addBook.addEventListener("click", () => {
  
})
