import environment from "./environment";
import "./css/main.css";

export function configure(aurelia) {
  aurelia.use.standardConfiguration().feature("resources");

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin("aurelia-testing");
  }

  aurelia.start().then(() => aurelia.setRoot());
}
