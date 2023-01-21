const fs = require ('fs/promises');

function renderTemplate (response, templatePath) {
    dispatchResource (response, templatePath, 'text/html');
}

function dispatchCSS (response, path) {
    dispatchResource (response, path, 'text/css');
}

function dispatchJSON (response, path) {
    dispatchResource (response, path, 'application/json');
}

function dispatchJS (response, path) {
    dispatchResource (response, path, 'application/javascript');
}

function dispatchResource (response, path, type='text/plain') {
    fs.readFile (path)
    .then ((data) => {
        response.statusCode = 200;
        response.setHeader ('Content-Type', type);
        response.end (data);
    })
    .catch ((err) => {
        console.log (err);
        response.statusCode = 404;
        response.end ('Template not found.');
    });
}

module.exports = { renderTemplate, dispatchCSS, dispatchJSON, dispatchJS, dispatchResource };