const express = require("express");
const app = express();
app.set("view engine", "ejs");
const logRequests = require("./middleware/logger");
const authenticateUser = require("./middleware/auth");
const checkRole = require("./middleware/role");
const errorHandler = require("./middleware/errorHandler");
app.use(logRequests);
const port = 3000;
app.use(express.json());

const books = [
{
    id: 1,
    name: "The Art of War",
    nationality: "Chinese",
    genre: "Military Strategy",
    email: "sunzi@example.com",
  },
  {
    id: 2,
    name: "Noli Me Tángere",
    nationality: "Filipino",
    genre: "Historical Fiction",
    email: "rizal@example.com",
  },
  {
    id: 3,
    name: "1984",
    nationality: "British",
    genre: "Dystopian Fiction",
    email: "orwell@example.com",
  },
  {
    id: 4,
    name: "One Hundred Years of Solitude",
    nationality: "Colombian",
    genre: "Magical Realism",
    email: "marquez@example.com",
  },
  {
    id: 5,
    name: "Kafka on the Shore",
    nationality: "Japanese",
    genre: "Fantasy",
    email: "murakami@example.com",
  }

];
const authors = [
  {
    id: 1,
    name: "Raymund Valerio",
    nationality: "Filipino",
    genre: "Fantasy",
    email: "junell.manzon@example.com",
  },
  {
    id: 2,
    name: "Angelito Biandilla",
    nationality: "Filipino",
    genre: "Fantasy",
    email: "angelito.biandilla@example.com",
  },
  {
    id: 3,
    name: "Isaiah",
    nationality: "Hebrew",
    genre: "Religion",
    email: "isaiah@example.com",
  },
];



// my new and changed routes for ez access

app.get("/", (req, res) => {
  const book = {
    id: 1,
    name: "The Art of War",
    nationality: "Chinese",
    genre: "Military Strategy",
    email: "sunzi@example.com",
  };

res.render("index", { book });

});

app.get('/books/view', (req, res) => {
 res.render('books', { books });
});

//for dashboard
app.get("/dashboard", authenticateUser, checkRole, (req, res) => {
  const student = {
    name: "Angelito Biandilla",
    course: "BSIT",
    year: 4, 
  };

  res.render("dashboard", { 
    student, 
    totalBooks: books.length,
    totalAuthors: authors.length,
    books 
  });
});










//old ones
app.get("/test-error", (req, res, next) => {
  next(new Error("Test Error"));
});


app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/authors", authenticateUser, checkRole, (req, res) => {
  res.json(authors);
});

app.get("/authors/:id", authenticateUser, checkRole, (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find((author) => author.id === authorId);

  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

app.get("/contact", (req, res) => {
  res.send("abiandilla2015@gmail.com");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).json({ message: "Book added successfully" });
});

app.put("/books", (req, res) => {
  const bookId = Number(req.body?.id);
  if (!bookId) {
    return res.status(400).json({ message: "Book id is required" });
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    return res.json(books[bookIndex]);
  }

  return res.status(404).json({ message: "Book not found" });
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
