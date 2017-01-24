#!/usr/bin/env node

/*jslint node:true*/

process.title = 'bob builder test';

var path = require( 'path' );


// Determines bob's app directory.
var dirBob = path.resolve( __dirname, '..' );

require( path.join( dirBob, 'main.js' ) );