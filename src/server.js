const http = require ('http');

class CustomServer {
    #server;
    #routes;
    #host;
    #port;

    constructor (config, defaultHandler) {
        this.#server = null;
        this.#routes = {'/': defaultHandler};
        this.#host = config.host;
        this.#port = config.port;

        this.handleRequest = this.handleRequest.bind (this);
    }


    run (initFunction) {
        this.#server = http.createServer (this.handleRequest);
        
        const init = initFunction ? 
                    initFunction : 
                    () => console.log (`Server running at http://${this.#host}:${this.#port}`);
        this.#server.listen (this.#port, this.#host, init);
    }


    setRoute (newRoute, handler) {
        try {
            if (newRoute in this.#routes) {
                throw 'Attempting to overwrite an existing route';
            }

            this.#routes[newRoute] = handler;
        } catch (err) {
            console.log (`Failed at setting a new route '${newRoute}'. ${err}`);
        }
    }

    getRoutes () {
        return this.#routes;
    }


    getRouteHandler (route) {
        return this.#routes[route];
    }


    handleRequest (request, response) {
        const route = request.url;
        
        console.log (`[${new Date ().toString()}]\t${request.method}\t'${route}'`);
        
        try {
            if (!(route in this.#routes)) {
                throw `URL ${route} does not exist!`;
            }
            
            this.getRouteHandler (route) (response);
        } catch (err) {
            console.log (`Failed to handle request with url ${route}. ${err}`);
            response.statusCode = 404;
            response.end (`Server Error. ${err}`);
        }
        
    }
}

module.exports = CustomServer;