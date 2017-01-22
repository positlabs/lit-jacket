'use strict';
// var _ = require( 'lodash' );
var bodyParser = require( 'body-parser' );
var express = require( 'express' );
// var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var methodOverride = require( 'method-override' );
var path = require( 'path' );
var chalk = require( 'chalk' );
var cacheResponseDirective = require( 'express-cache-response-directive' );
const remotes = require( path.resolve( __dirname, '..', process.env.remotesPath ) );

class Server {
	constructor() {
		var app = express();

		// ---------------------------------------------------------
		// Middleware

		app.use( logger( 'dev' ) );
		app.use( methodOverride() );
		// parse application/x-www-form-urlencoded
		app.use( bodyParser.urlencoded( {
			extended: false
		} ) );
		// parse application/json
		app.use( bodyParser.json() );
		app.use( cacheResponseDirective() );

		// ---------------------------------------------------------
		// Dynamic Routes

		app.get( '/pwm/:id/:duty', require( './routes/gpio' ) );
		app.get( '/gpio/:id/:state', require( './routes/gpio' ) );
		app.get( '/sensor/:id', require( './routes/sensor' ) );
		app.get( '/pixels', require( './routes/pixel' ) );
		app.post( '/pixels', require( './routes/pixel' ) );

		// ---------------------------------------------------------
		// Static Routes

		app.use( '/', require( './routes/console' ) );

		// ---------------------------------------------------------
		// Error Handling

		app.use( require( './routes/404' ) );

		// ---------------------------------------------------------
		// Start Server
		app.listen( env.port, function() {} );
	}
}

module.exports = Server;
