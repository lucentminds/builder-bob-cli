#!/usr/bin/env node

var os = require( 'os' );
var path = require( 'path' );
var fs = require( 'fs' );
var fse = require( 'fs-extra' );
var INSTALL_DIR = path.resolve();
var HOME_DIR = os.homedir();
var BOB_DIR = path.join( HOME_DIR, '.builder-bob');
var BOB_CONFIG_TEMPLATE = path.join( INSTALL_DIR, 'config-example.json');
var BOB_CONFIG = path.join( BOB_DIR, 'config.json');


try {
    fs.lstatSync( BOB_CONFIG );
}
catch( e ){
    // console.log( '**********' );
    // console.log( BOB_CONFIG_TEMPLATE );
    // console.log( BOB_CONFIG );
    // console.log( '**********' );

    fse.ensureDirSync( BOB_DIR );
    fse.copySync ( BOB_CONFIG_TEMPLATE, BOB_CONFIG );
}
