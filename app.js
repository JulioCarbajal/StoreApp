"use strict";

/**
 * Module dependencies.
 */
var http = require('http')
  , path = require('path')
  , express = require('express')
  , routes = require(path.join(process.cwd(), 'routes', 'index.js'))
  , app = express()
  , swig = require('swig')
;

var options = {
  host: 'localhost',
  port: 2323
};

//check if server is already running
http.get(options, function(res) {
  console.log('server is running, redirecting to localhost');
  if (window.location.href.indexOf('localhost') < 0) { 
    window.location = 'http://localhost:' + app.get('port');
  }
}).on('error', function(e) {
  //server is not yet running

  // all environments
  app.set('port', process.env.PORT || 2323);
  app.set('views', process.cwd() + '/views');
  app.set('view cache', false);
  app.engine('html', swig.renderFile);

  app.set('view engine', 'html');
  app.use(require('stylus').middleware(path.join(process.cwd(), 'public')));
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.get('/', routes.index);
  app.get('/test', routes.test);
  
  http.createServer(app).listen(app.get('port'), function(err){
    console.log('server created');
    if (window.location.href.indexOf('localhost') < 0) { 
      window.location = 'http://localhost:' + app.get('port');
    }
  });
});
