const server = require("../Server");
const { payloadParser } = require("../utility/utility");
const requestParser = require("../chain-of-responsibilities/RequestParser");
const validation = require("../chain-of-responsibilities/Validation");
const logger = require("../chain-of-responsibilities/Logger");

class Router {
  constructor(routes, servicesInstances,validationRules) {
    console.log("APP CONTROLLERS");
    console.log(routes);

    server.on("newRequest", async (req, res) => {
      const payload = await payloadParser(req);
      req.payload = payload;

      requestParser.handle(req, res, routes, servicesInstances,validationRules);
    });
  }
}

module.exports = Router;
