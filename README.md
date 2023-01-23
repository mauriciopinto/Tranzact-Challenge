# Tranzact-Challenge
Repository for the Tranzact coding challenge.

## Tools Used
This project was developed using [NodeJS](https://nodejs.dev/en/) For the backend, which handles requests for HTML templates, JSON files, and any other resources in the working directory, I made use of the following NodeJS libraries:

- [HTTP](https://nodejs.org/api/http.html)
- [File System](https://nodejs.org/api/fs.html)

For the frontend, I mainly used plain HTML, plain javascript and plain CSS. I imported the [axios](https://axios-http.com/docs/intro) library for http requests from client side.

## How to run
Clone this repository, move to the root folder and create the file `.env`. Then, enter the following fields this file:

```
HOST=localhost
PORT=8000
```

Once that is done, run the following commands from the root folder:

```
npm install   # Install dependencies
npm start     # Run app
```

The server will print the default URL for the project. This URL is the one that will render the HTML index page. Open a web browser and browse said URL.

## Observations
Some things that weren't clear to me, and how I handled them, are:

- I didn't understand why (in the challenge instructions) the premium table had two columns, one for Annual prices and one for monthly prices. From what I understood, the user should be able to choose the period themselves. The way I handled it was by using only one column which changes every time the user clicks on 'Get Premium', depending on the selected period.
