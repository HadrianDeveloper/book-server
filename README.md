# Project overview
For this project, I created a http server and implemented the `Model-view-controller` (MVP) framework to handle GET and POST requests for data stored in local JSON files. Async functionality is handled by `Promises`, and the `node:http` and `fs/promises` libraries.

# Project structure
## /project-showcase
An implementation of the `Model-view-controller (MVC) framework' which structures HTTP requests for book and author data from local JSON files.


## /practice
## Challenges

1. Use Node's `http` module to create a web server that responds with a status 200 and a greeting when it receives a GET request on the path `/api` (e.g. `{ message: "Hello! }`)

2. GET `/api/books` endpoint serves a JSON object with a key of `books` from the `./data/books.json`

3. GET `/api/authors` endpoint serves a JSON object with a key of `authors` from the `./data/authors.json` file.

4. GET `/api/books/:bookId` (e.g. `/api/books/1`) parametric endpoint that responds with a status 200 and a JSON object, that has a key of `book` with a value of the relevant book object from the `./data/books.json` file.

5. POST `/api/books` endpoint that accepts a book object on the body of the request and adds the book to the `./data/books.json` file. The endpoint should respond with the newly created book object. Additional considerations:

   - How could you ensure that the `bookId` that is created is unique?
   - What status code should the server respond with?

6. GET `/api/books/:bookId/author` (e.g. `/api/books/1/author`) parametric endpoint that responds with a status 200 and a JSON author object for the specified book. The JSON object should have a key of `author` with a value of a single author object from the `./data/authors.json` file.

## Even More Challenges

7. Add error-handling to your GET `/api/books/:bookId` and `/api/books/:bookId/author` endpoints. Think about what should happen if a request is made for a book that doesn't exist. What status code should be sent?

8. Add a `fiction` query parameter to your GET `/api/books` endpoint (e.g. `/api/books?fiction=true` or `/api/books?fiction=false`) that searches for books that are either fiction, or non-fiction.

9. Add error-handling to your POST `/api/books` endpoint. Think about what should happen if a request is made without including enough information on the body of the request. What status code should be sent?

10. Add error-handling to your GET `/api/books` endpoint. Think about what should happen if an invalid query is used, e.g. `?fiction=banana`. What status code should be sent?