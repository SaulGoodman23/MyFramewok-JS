require("reflect-metadata");

function controller(prefix) {
  return (target) => {
    Reflect.defineMetadata("prefix", prefix, target);
  };
}

function method(method) {
  return (target, key, desc) => {
    Reflect.defineMetadata("method", method, target, key);
  };
}

function path(path) {
  return (target, key, desc) => {
    Reflect.defineMetadata("path", path, target, key);
  };
}

function injectToDI(depName) {
  return (target) => {
    Reflect.defineMetadata("dep", depName, target);
  };
}

function useDependency(dependency) {
  return (target) => {
    Reflect.defineMetadata("dependency", dependency, target);
  };
}

function name(methodName) {
  return (target, key, desc) => {
    Reflect.defineMetadata("name", methodName, target, key);
  };
}

function bodyValidation(schema){
  return (target, key, desc) => {
    Reflect.defineMetadata("schema", schema, target, key);
  };
}

function validator(validationType){
  return (target, key, desc) => {
    Reflect.defineMetadata("validation_type", validationType, target, key);
  };
}

module.exports = {
  controller,
  method,
  path,
  injectToDI,
  useDependency,
  name,
  bodyValidation,
  validator
};
