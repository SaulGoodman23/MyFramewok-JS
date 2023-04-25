const url = require("url");
const BaseHandler = require("./BaseHandler");

class RequestParser extends BaseHandler {
  handle(request, response, routes,servicesInstances,validationRules) {
    const { pathname, query } = url.parse(request.url, true);
    request.pathName = pathname;
    request.query = query;
    return super.handle(request, response, routes,servicesInstances,validationRules);
  }
}

module.exports = new RequestParser();
