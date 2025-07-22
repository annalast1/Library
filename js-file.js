const myLibrary = [];

// Book constructor
const Book = class {
        constructor(title, author, pages, desc, read) {
            this.id = crypto.randomUUID();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.desc = desc;
            this.read = read;
            this.delete = null;
        }
};

Book.prototype.readStatus = function(bool) {
    this.read = bool;
}
// Create new object and store
function addBookToLibrary(title, author, pages, desc, read) {
    const newBook = new Book(title, author, pages, desc, read);
    myLibrary.push(newBook);
};

// GET BOOK INFO

// DOM
const addBook = document.getElementById("addBook");
const dialog = document.querySelector("dialog");
const bookForm = document.getElementById("bookForm");
const close = document.getElementById("close");
const submit = document.getElementById("submit");

// show form
addBook.addEventListener("click", () => {
    dialog.showModal();
});

// close form
close.addEventListener("click", () => {
    dialog.close();
    bookForm.reset();
})


// get form info
submit.addEventListener("click", (e) => {
    e.preventDefault;

    // Check form validity and get data  
     
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const desc = document.getElementById("desc").value;
    const read = document.getElementById("read-status").checked;

    if (title != '' && desc != '' && author != '') {
        addBookToLibrary(title, author, pages, desc, read);
        dialog.close();
        bookForm.reset(); 
        updateTable();
    } else {
        alert("Title, Author and Description must be filled in");
    }
})

function removeBook(id) {
    myLibrary.forEach(book => {
        if (id == book.id) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            console.log(book.id);
        }
        updateTable();
    })
}

// Display library
function displayBooks() {
    const tableBox = document.getElementById("tableBox");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headers = ['Id', 'Title', 'Author', 'Pages', 'Genre', 'Read?', 'Delete'];
    tableBox.appendChild(table);

    // create table headers
    headers.forEach(title => {
        const th = document.createElement("th");
        th.textContent = title;
        thead.appendChild(th);
    })
    table.appendChild(thead);
    table.appendChild(tbody);

    // add book info
    myLibrary.forEach(book => {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (const entry in book) {
            if (book.hasOwnProperty(entry)) {
            const td = document.createElement("td");
            switch (entry) {
                case 'delete':
                    const delBtn = document.createElement("button");
                    delBtn.dataset.id = book.id;
                    const png = document.createElement("img");
                    png.src = './icon/image.png';
                    delBtn.addEventListener("click", () => {
                        removeBook(delBtn.dataset.id)
                    });

                    delBtn.appendChild(png);
                    td.appendChild(delBtn);
                    tr.appendChild(td);
                    break;
                case 'read':
                    const check = document.createElement("input");
                    check.type = "checkbox";
                    check.name = 'readStatus';
                    check.checked = book.read;
                    check.addEventListener("click", () => {
                        book.readStatus(check.checked);
                        console.log(book);
                    })
                    
                    td.appendChild(check);
                    tr.appendChild(td);
                    break;
                default:
                    td.textContent = book[entry];
                    tr.appendChild(td);
                    break;                   
            }
        }}
    })  
}

function updateTable() {
    const table = document.querySelector("table");
    if (table != null) {
    table.remove();
    displayBooks();
    }
}

displayBooks();