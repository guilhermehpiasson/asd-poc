var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/json' }));

  app.use(expressValidator());

  consign()
   .include('routes')
   .then('persistencia')
   .then('servicos')
   .then('tarefas')
   .then('filas')
   .into(app);

  return app;
}
