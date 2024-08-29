const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(
    `${this.title} by ${this.author} , ${this.pages} pages, ${this.read}`
  );
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBook() {
  const container = document.querySelector(".container-body");
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-index", index);

    card.innerHTML = `<h2>${book.title}</h2>   
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read}</p>
        <button class="remove-btn">Remove</button>`;

    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeBook(index);
    });

    container.appendChild(card);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBook();
}

function initialize() {
  const clickBtn = document.querySelector(".click-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const formContainer = document.querySelector(".form-container");
  const bookForm = document.getElementById("book-form");
  clickBtn.addEventListener("click", () => {
    if (
      formContainer.style.display === "none" ||
      formContainer.style.display === ""
    ) {
      formContainer.style.display = "flex";
    } else {
      formContainer.style.display = "none";
    }
  });

  cancelBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
  });

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(title, author, pages, read);
    formContainer.style.display = "none";

    bookForm.reset();
    displayBook();
  });

  displayBook();
}

initialize();
