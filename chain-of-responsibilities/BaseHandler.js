const {
    sendResponse,
    validPaths,
    checkRoute,
    routeIsValid,
    specifyDependencyRelatedToTheController,
    validationBasedOnBodyValidationSchema
} = require("../utility/utility");

const validation = require("../validation/Validation");
const {ResponseStatusCodes, ResponseMessages, ResponseStatus} = require("../utility/responseConfigs");


class BaseHandler {
    #nextHandler;

    handle(request, response, routes, servicesInstances,validationRules) {
        if (this.#nextHandler) {
            return this.#nextHandler.handle(
                request,
                response,
                routes,
                servicesInstances,
                validationRules
            );
        } else {
            const validRoutesAndMethods = validPaths(request.pathName, routes);
            const incomingRequestUrlandMethod = checkRoute(request);
            const validRoute = routeIsValid(
                validRoutesAndMethods,
                incomingRequestUrlandMethod
            );

            // specify dependency related to the controller
            const instances=specifyDependencyRelatedToTheController(routes,servicesInstances,incomingRequestUrlandMethod)

            // validation payload or query string
            // if (request.method === 'POST' || request.method === "PUT") validation.bodyValidation(request.payload
            // Specify which validation rules must be run based on decorator
            const validationResult=validationBasedOnBodyValidationSchema(validationRules,validRoute,request.payload)

            if (validRoute) {
                validRoute.controller.controller
                    .getInstance(instances)
                    [validRoute.handler](request, response,validationResult);
            } else {
                sendResponse(response, ResponseStatusCodes.NOTFOUND, ResponseMessages.NOTFOUND, ResponseStatus.NOT_FOUND);
            }
        }
    }

    setNext(handler) {
        this.#nextHandler = handler;
        return handler;
    }
}

module.exports = BaseHandler;
