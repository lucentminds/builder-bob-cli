#!/usr/bin/env node

/*jslint node:true*/

process.title = 'bob builder test';

//var Q = require( 'q' );
var path = require( 'path' );
var fs = require( 'fs' );
var os = require( 'os' );


// Determines the arguments passed to the app.
var aArgs = process.argv.slice( 2 );

// Parse the arguments.
var argv = require('minimist')( aArgs );

// Determines the directory this app was launched from.
var dirLaunch = path.resolve( process.cwd() );

// Determines the directory of this app's context.
var dirBase = path.resolve( argv.base || argv.b || dirLaunch );

// Determines the directory the bob.js script is in.
var dirBin = __dirname;

// Determines bob's app directory.
var dirBob = path.resolve( __dirname, '..' );


// Determines bob's lib directory.
var libDir = path.join( dirBob, 'lib' );

var HOME_DIR = os.homedir();
var BOB_DIR = path.join( HOME_DIR, '.builder-bob');
var BOB_CONFIG_TEMPLATE = path.join( dirBin, 'config-example.json');
var BOB_CONFIG = path.join( BOB_DIR, 'config.json');

// Validate base directory.
try {
    fs.lstatSync( dirBase );
}
catch( e ) {
    console.log( e.message );
    process.exit( 1 );
}

// Determines an additional directory path to scan for task and "extra" files.
var dirTask = argv.tasks || '';

// Create a new bob.
var bob = require( path.join( libDir, 'bob-runner' ) ).factory({
    argv: argv,
    launchDir: dirLaunch,
    baseDir: dirBase,
    binDir: dirBin,
    bobDir: dirBob,
    libDir: libDir
});


if( aArgs.length < 1 ) {
    // Run terminal.
    require( path.join( libDir, 'bob-terminal' ) )( bob );
}
else {
    // Run job.
   // require( '../lib/task_runner' )( aArgs[0] );
}



console.log( dirBase );
console.log( argv );
