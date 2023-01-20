const CustomServer = require ('./server/server');
const config = require ('./config/default');
const dispatcher = require ('./server/dispatch');
const utils = require ('./utils');


function renderIndex (request, params, response) {
    dispatcher.renderTemplate (response, 'src/templates/index.html');
}


function dispatchStates (request, params, response) {
    let method = request.method;

    switch (method) {
        case 'GET':
            dispatcher.dispatchJSON (response, 'src/data/states.json');
            break;

        default:
            break;
    }
    
}


function dispatchPlans (request, params, response) {
    let method = request.method;

    switch (method) {
        case 'GET':
            dispatcher.dispatchJSON (response, 'src/data/plan_options.json');
            break;
        
        default:
            break;
    }
}


function dispatchPremiums (request, params, response) {
    let method = request.method;
    
    switch (method) {
        case 'GET':
            console.log (params);
            if (params.length > 0) {
                let paramsList = params.split ('&').slice (0, -1);
                
                let paramsObject = {};
                paramsList.map ((param) => {
                    const [key, value] = param.split ('=');
                    paramsObject[key] = value;
                })
                utils.calculatePremiums (paramsObject, response);
            } else {
                dispatcher.dispatchJSON (response, 'src/data/plans.json');
            }
            break;

        default:
            break;
    }
}


const server = new CustomServer (config, renderIndex);

server.setRoute ('/data/states', dispatchStates);
server.setRoute ('/data/plans', dispatchPlans);
server.setRoute ('/premium', dispatchPremiums);
server.run ();