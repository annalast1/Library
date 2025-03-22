// create array 
const myLibrary = [];
// DOM
const bookForm = document.getElementById("bookForm");
const dialog = document.querySelector("dialog");
const submit = document.getElementById("submit");
// object constructor
function Book(title, author, pages, desc, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.desc = desc;
    this.read = read;
    this.delete = null;
};
// show form
const addBook = document.getElementById("addBook");
addBook.addEventListener("click", () => {
    bookForm.reset();
    dialog.showModal();
})

// close form
const cancel = document.getElementById("close");
cancel.addEventListener("click", () => {
    dialog.close();
    bookForm.reset();
})

// add book to library
submit.addEventListener("click", () => {
    // get info from form
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const desc = document.getElementById("desc").value; 
    const read = document.getElementsByName("read-status");   

    addBookToLibrary(title, author, pages, desc, read);
    // if table has already been created update display
    if (myLibrary.length > 1){
        updateTable();
    } else displayBooks();
})

// create new book object and store
function addBookToLibrary(title, author, pages, desc, read) {
    const newBook = new Book(title, author, pages, desc, read);
    myLibrary.push(newBook);
}
// create table to display books
function displayBooks() {
    const tableBox = document.getElementById("tableBox")
    // create table, head and body
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // create table headings
    const tr = thead.insertRow(0)
    const headers = ['Id', 'Title', 'Author', 'Pages', 'Description', 'Read?', 'Delete'];
    headers.forEach(heading => {
        const th = document.createElement("th");
        th.textContent = heading;
        tr.appendChild(th);
    })
    thead.appendChild(tr);
    table.appendChild(thead);

    // create cells
    myLibrary.forEach( (book) => {
        const tr = document.createElement("tr");
        for (const item in book) {
            const td = document.createElement("td");
            if (item == 'delete') {
                const deleteBtn = document.createElement("button");
                deleteBtn.dataset.id = book.id;
                const png = document.createElement("img");
                png.src = './icon/image.png';
                
                deleteBtn.style.border = "none";
                deleteBtn.addEventListener("click", () => {
                    removeBook(deleteBtn.dataset.id)
                })

                deleteBtn.appendChild(png);
                td.appendChild(deleteBtn);

                
            } else if (item == 'read') {
                const read = document.createElement('input');
                read.setAttribute("type", "checkbox");
                read.checked = book.read;             
                read.name = 'readStatus';   
                read.addEventListener("click", () => {
                    book.readStatus(read.checked);
                    console.log(book);
                });
                td.appendChild(read);


            } else {
                td.textContent = book[item];
            }
            tr.appendChild(td);
            tbody.appendChild(tr);
            table.appendChild(tbody);
            tableBox.appendChild(table);
        }
    })
}

// remove books
function removeBook(id) {
    myLibrary.forEach(book => {
        if (id == book.id) {
            myLibrary.splice(book.id, 1);    
        }
        updateTable();
    })
}
// update display
function updateTable() {
    const table = document.querySelector("table");
    table.remove();
    displayBooks();
}

// prototype
function toggleReadStatus(bool) {
    this.read = bool;
}

// add dummy books and display table
addBookToLibrary('Mythago Wood', 'Robert Holdstock', 750, 'Fantasy', true);
console.log(myLibrary[Book[0]]);
addBookToLibrary('Green Fingers', 'A. Gardener', 180, 'Factual', false);
displayBooks();

Book.prototype.readStatus = function(bool) {
    this.read = bool;
}

