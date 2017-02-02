const path = require( 'path' );
const Promise = require( 'bluebird' );
const getPixels = require( 'get-pixels' );
const EventEmitter = require( 'events' );

var route = ( controller ) => ( req, res ) => {
	let filename = Date.now();
	// record new image option
	// set current image
	controller.setColormap( req.file.buffer, req.file.mimetype );
	res.send( {
		message: 'Image Set',
		status: 'ok'
	} );
};

module.exports = route;
