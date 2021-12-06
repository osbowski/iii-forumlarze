const getBooksFromStorage = () => {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  };
  
  const renderBooks = (booksToRender, target) => {
    const targetHTMLElement = document.querySelector(`.${target}`);
    targetHTMLElement.innerHTML = "";
  
    booksToRender.map((bookToRender) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add('book-card')
      bookDiv.innerHTML = `
      <div>
          <h3>${bookToRender.title} - ${bookToRender.author}</h3>
          <p>Genre: <strong>${bookToRender.category}</strong></p>
          <p>Priority of reading: <strong>${bookToRender.priority}</strong></p>
          </div>  
          `;
  
      targetHTMLElement.appendChild(bookDiv);
    });
  };
  
  const addBook = () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const priority = document.querySelector("#read-priority");
    const category = document.querySelector("#category");
    const book = {
      title: title.value,
      author: author.value,
      priority: priority.value,
      category: category.value,
      id: Math.random()
    };
    const books = getBooksFromStorage();
    books.push(book);
  
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks(books, "book-list");
    title.value = "";
    author.value = "";
    priority.value = "1";
    category.value = "";
  };
  
  const books = getBooksFromStorage();
  renderBooks(books, "book-list");
  
  
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
  });