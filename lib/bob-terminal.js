/** 
 * 12-24-2016
 * ~~ Scott Johnson
 */

/*jslint node:true*/
var vorpal = require( 'vorpal' )();
var Q = require( 'q' );

// Determines the user's command history.
var aHistory;

var BobTerminal = module.exports = function( bob ){

};// /BobTerminal()

var extend = function( obj1, obj2 ) {
    var i;

    for ( i in obj2 ) {
        obj1[ i ] = obj2[ i ];
    }// /for()

    return obj1;
};// /extend()

/**
 * Easy method for sending back a reply to the terminal.
 */
var reply = function(){
	console.log.apply( console, arguments );
};// reply()



var cli = {
	command:{},

	addCommand: function( cCommand, cDescript ){
		var cName = cCommand.split( ' ' )[0];
		var oCommand = vorpal.command( cCommand, cDescript );

		this.command[ cName ] = oCommand;
		oCommand.name = cName;
		return oCommand;

	},// /addCommand()

	loadCommandHistory:function(){
		var cHistory;

		// Make sure the history file exists.
		fse.ensureFileSync( PATH_HISTORY_JSON );

		cHistory = fs.readFileSync( PATH_HISTORY_JSON, 'utf8' );

		if ( cHistory.length < 1 ) {
			// File is empty.
			aHistory = [];

		}
		else {
			try {
				aHistory = JSON.parse( cHistory );
			}catch( e ){
				console.log( 'Failed to parse history file:',PATH_HISTORY_JSON );

				/**
				 * Try and parse it again so the failed parse shows in the
				 * console to the user.
				 */
				JSON.parse( cHistory );
			}
		}

		// Set vorpal's command history.
		vorpal.session.cmdHistory._hist = aHistory.slice( 0 );
	}// /loadCommandHistory()
};// /cli()

// Load the application history file.
cli.loadCommandHistory();

console.log( 'Your current working directory is:',process.cwd() );

vorpal
	.delimiter( 'bob$' )
	.on( 'client_prompt_submit', function( cCommand ){
		aHistory.push( cCommand );
		fs.writeFileSync( PATH_HISTORY_JSON, JSON.stringify( aHistory, null, '\t' ), 'utf-8' );
	});

console.log( "Hi! I'm Bob! You're at", process.cwd(), "." );
vorpal.show();


/**
 * Remove the default "exit" command. We want to create a custom one.
 */
vorpal
	.find( 'exit' )
	.remove();

/**
 * Custom exit command.
 */
vorpal
	.command( 'exit', 'Ends cli session.' )
	.action(function( args, fnCallback ){
		process.exit();
	});

vorpal
	.command( 'cls', 'Clears the screen.' )
	.action(function( args, fnCallback ){
		process.stdout.write('\033c');
		fnCallback();
	});

vorpal
	.command( 'pwd', 'Outputs the current working directory.' )
	.action(function( args, fnCallback ){
		this.log( process.cwd() );
		fnCallback();
	});