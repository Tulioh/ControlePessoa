var http = require( "http" );
var express = require( "express" );
var app = require( "./config/express" )(app);
var config = require('./config/config');

http.createServer( app ).listen( config.port, config.address, function() {
    console.log('Express Http Server ' +
        config.address + ' escutando na porta ' + config.port);
});