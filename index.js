/**
 * Created by monstertke on 10/13/15.
 */
'use strict';

var options = {
  port: 8080,
  templating: 'jade'
}

var pomegranate = require('pomegranate');
var Errors = require('./utilities/Errors')

pomegranate
  .init(options)
  .addDependency('Errors', Errors)
  .useGlobal(function(app){
    return app.all('*?', function(req, res, next){
      res.render('FrontPage')
    })
  })
  .start()
  .on('log', function(msg) {
    console.log(msg);
  })
  .on('log-request', function(msg, meta) {
    console.log(msg);
  })
  .on('error', function(err) {
    console.log(err);
    if(err.stack) console.log(err.stack)
  })