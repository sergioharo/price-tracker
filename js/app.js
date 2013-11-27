define(["config", "parse", "router"], function (config, Parse, Router) {

	Parse.initialize(config.parse.application.id, config.parse.javascript.key);
    
  new Router;
  Parse.history.start();
});