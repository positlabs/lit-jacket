'use strict';
const path = require( 'path' );
const log = require( '../js/lib/log' );
const express = require( 'express' );
const Controller = require( './Controller' );

// ---------------------------------------------------------
// Middleware includes

// var favicon = require( 'serve-favicon' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const multer = require( 'multer' );
const cacheResponseDirective = require( 'express-cache-response-directive' );
const HeaderUtils = require( '../lib/js/HeaderUtils' );

class Server {
	constructor( options ) {
		var remotes = options.remotes;
		var app = express();
		var controller = new Controller();

		// ---------------------------------------------------------
		// Middleware

		var upload = multer( {
			storage: multer.diskStorage( {
				destination: ( req, file, cb ) => cb( null, path.resolve( __dirname, '../../image-cache/' ) ),
				filename: ( req, file, cb ) => cb( null, `${Date.now()}.${path.extname(file.filename)}` )
			} )
		} );

		app.use( logger( 'dev' ) );

		// parse application/json
		app.use( bodyParser.json() );

		// general response prep
		app.use( cacheResponseDirective() );
		app.use( '/*', ( req, res, next ) => {
			res.cacheControl( {
				maxAge: 300
			} );
			HeaderUtils.addJSONHeader( res );
			HeaderUtils.addCORSHeader( res );
			next();
		} );

		// ---------------------------------------------------------
		// Sockets


		// ---------------------------------------------------------
		// Dynamic Routes

		app.get( '/pwm/:id/:duty', require( './routes/pmw' ) );
		app.get( '/gpio/:id/:state', require( './routes/gpio' ) );
		app.get( '/sensor/:id', require( './routes/sensor' )( controller ) );
		app.get( '/pixels', require( './routes/get-pixels' )( controller ) );
		app.post( '/pixels', upload.single( 'image' ), require( './routes/post-pixels' )( controller ) );

		// ---------------------------------------------------------
		// Static Routes

		app.use( '/', require( './routes/console' ) );

		// ---------------------------------------------------------
		// Error Handling

		app.use( require( './routes/404' ) );

		// ---------------------------------------------------------
		// Start Server
		app.listen( 80, function() {} );
	}
}

module.exports = Server;
