const CustomServer = require ('./server');
const config = require ('./config/default');
const fs = require ('fs/promises');

function renderTemplate (response, templatePath) {
    fs.readFile (templatePath)
    .then ((data) => {
        response.statusCode = 200;
        response.setHeader ('Content-Type', 'text/html');
        response.end (data);
    })
    .catch ((err) => {
        console.log (err);
        response.statusCode = 404;
        response.end ('Template not found.');
    });
    
}


function renderIndex (response) {
    renderTemplate (response, 'templates/index.html');
}


const server = new CustomServer (config, renderIndex);

server.run ();