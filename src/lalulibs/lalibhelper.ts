/** @module Helper Library 

I'm Glad to be Me.
By Jammi Dee

See those little creatures
Having their own lilfe ventures
Showing their wonderful skills
Only they have the right to tell.

Like those birds that fly
In the blue lovely sky
As they show their style
On w/c their customs rely.

See the fish that swims
On w/c you can have only on dreams
Swimming on a liquid cream
On a clear crystal water it seems.

But I have my own
On the characteristics I've shown
On my spirit it have grown
The beauty of my own.

I'm glad that you is you
And me is not you
For I have me while yours you
You add beauty to me and you.

I is me and only me
And you give colour to me
I hope we're always be we
I'm glad to be me.

*/

import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import fs from 'fs';
import nconf from 'nconf';
import mysql from 'mysql2';

//import colors from 'colors';

// Load configuration
nconf.use('file', { file: path.join(__dirname, 'config.json') });

/**
 * Added by JMD 09/26/2017.
 * This function writes a log to the framework database for audit trail purposes.
 * @summary Function that writes to the framework logs.
 * @param {function} callback The function to be executed on result.
 * @author Jammi Dee <jammidee.gmail.com>
 * @copyright Connext Philippines 2017
 */

interface AppLogCallback {
    (error: Error | null, result: string): void;
}

interface LogOptions {
    pUserId: string;
    pMsg: string;
    pModuleId: string;
    pAppId: string;
    pProcess: string;
    pScopeId: string;
    pStype: string;
    pEntity: string;
    callback: AppLogCallback;
}

const writeAppLog = (options: LogOptions): void => {
    const {
        pUserId,
        pMsg,
        pModuleId,
        pAppId,
        pProcess,
        pScopeId,
        pStype,
        pEntity,
        callback
    } = options;

    let strServerIp: string = '127.0.0.1'; // Default server IP


    // Detect server IP
    const interfaces = os.networkInterfaces();
    for (const [, iface] of Object.entries(interfaces)) {
        if (iface) {
            for (const entry of iface) {
                if (entry.family === 'IPv4' && entry.address !== '127.0.0.1') {
                    strServerIp = entry.address;
                    break; // Exit loop once an IPv4 address other than localhost is found
                }
            }
        }
    }

    let logLevel: number;
    if (pStype === 'SYSTEM') {
        logLevel = 1;
    } else {
        logLevel = 2;
    }

    const suid: string = uuidv4();
    const eQuery: string = `
        INSERT INTO tbllog(juid, logdatetime, userid, msg, moduleid, appid, serverid, proccess, scopeid, stype, entity)
        VALUES ('${suid}', NOW(), '${pUserId}', '${pMsg}', '${pModuleId}', '${pAppId}', '${strServerIp}', '${pProcess}', '${pScopeId}', ${logLevel}, '${pEntity}');
    `;

    const connection = mysql.createConnection({
        host: nconf.get('hostname'),
        user: nconf.get('username'),
        password: nconf.get('password'),
        database: nconf.get('database')
    });

    connection.connect();

    connection.query(eQuery, (err, _rows, _fields) => {
        if (err) {
            connection.end();
            return callback(err, 'Error');
        }
        connection.end();
        return callback(null, 'OK');
    });
};

interface DBLogCallback {
    (error: Error | null, result: string): void;
};

const writeDB2Log = (pMsg: string, callback: DBLogCallback): void => {
    const strDate: string = moment(new Date()).format('YYYY-MM-DD');
    const strDBfile: string = `./dblogs/${strDate}.sql`;

    if (nconf.get('cgSwDBLog') === 'ON') {
        
        console.log('---------->> Function Name: cglibhelper.js : writeDB2Log ');

        try {
            if (fs.existsSync(strDBfile)) {
                // File exists
                const dblog = fs.createWriteStream(strDBfile, { flags: 'a' });
                dblog.write(`${pMsg}\n`);
                dblog.end();
            } else {
                const dblog = fs.createWriteStream(strDBfile, { flags: 'a' });
                dblog.write(`${pMsg}\n`);
                dblog.end();
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        console.warn('DBlogging is off...');
    }

    return callback(null, 'OK');
};

interface Quote {
    text: string;
    author: string;
}

interface GetMOTDayCallback {
    (error: Error | null, quote: Quote): void;
}

const getMOTDay = (callback: GetMOTDayCallback): void => {

    const quotes: Quote[] = [
        { text: "Stay Hungry. Stay Foolish.", author: "Steve Jobs" },
        { text: "Good Artists Copy, Great Artists Steal.", author: "Pablo Picasso" },
        { text: "Argue with idiots, and you become an idiot.", author: "Paul Graham" },
        { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
        { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Roosevelt" },
        { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "Whoever is happy will make others happy too.", author: "Anne Frank" },
        { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
        { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
        { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
        { text: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "Only a life lived for others is a life worthwhile.", author: "Albert Einstein" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
        { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo Da Vinci" }
    ];

    const qindex = Math.floor(Math.random() * quotes.length);
    const quote: Quote = quotes[qindex];

    console.log('======>>>>>> ' + quote.text + ' - ' + quote.author + ' <<<<<<======');

    return callback(null, quote);
};

export { writeAppLog, writeDB2Log, getMOTDay };


// module.exports = {
    
   
// 	/*
// 	  Added by Jammi Dee 09/26/2017
// 	*/
// 	/**


// 	writeAppLog: function( pUserId, pMsg, pModuleId, pAppId, pProcess, pScopeId, pStype, pEntity, callback ) {

// 		//Added by Jammi Dee 01/17/2018
// 		var colors = require('colors');
// 		colors.setTheme({
// 			silly:		'rainbow',
// 			input:		'grey',
// 			verbose:	'cyan',
// 			prompt:		'grey',
// 			info:		'green',
// 			data:		'grey',
// 			help:		'cyan',
// 			warn:		'yellow',
// 			debug:		'gray',
// 			error:		'red'
// 		});

// 		var strValue = 'OK';

// 		var path	= require('path');
// 		var nconf	= require('nconf');
// 		var os 		= require("os");
// 		var uuid	= require('node-uuid');

// 		nconf.use('file', { file: path.join(__dirname, 'config.json') });

// 		if( nconf.get('debugmode') === "ON" ){
// 			console.log('---------->> Function Name: writeAppLog '.debug);
// 		}

// 		var mysql		= require('mysql');
// 		var connection = mysql.createConnection({
// 			host		: nconf.get('hostname') ,
// 			user		: nconf.get('username') ,
// 			password 	: nconf.get('password') ,
// 			database 	: nconf.get('database')
// 		});

// 		var hostname 	= os.hostname();
// 		var strServerIp	= '127.0.0.1';

// 		var interfaces = os.networkInterfaces();

// 		//Detect the IP assign to the server
// 		for(name in interfaces) {
// 			var interface = interfaces[name];
// 			interface.forEach(function(entry) {

// 				//if( nconf.get('debugmode') === "ON" ){
// 				//	console.log('---------->> Acquired Interface: ' + entry.family + ' : ' + entry.address );
// 				//}

// 				if(entry.family === 'IPv4') {

// 					if( entry.address !== '127.0.0.1'){

// 						strServerIp = entry.address;
// 						if( nconf.get('debugmode') === "ON" ){
// 							console.log('---------->> Acquired IP: '.debug + strServerIp );
// 						}

// 					}
// 				}
// 			});
// 		}

// 		if( pStype === 'SYSTEM'){

// 			logLevel = 1;

// 		} else {

// 			logLevel = 2;

// 		}

// 		var suid	= uuid.v4();

// 		eQuery 	= 'insert into tbllog(juid,logdatetime,userid,msg,moduleid,appid, serverid, proccess,scopeid,stype, entity)' +
// 					'values(\'' + suid + '\', NOW(), \'' + pUserId + '\', \'' + pMsg + '\', \'' + pModuleId + '\', \'' + pAppId + '\', \'' + strServerIp + '\', \'' + pProcess + '\', \'' + pScopeId + '\', ' + logLevel + ', \'' + pEntity + '\');';

// 		if( nconf.get('debugmode') === "ON" ){
// 			console.log('---------->> Executing query: '.debug + eQuery );
// 		}

// 		connection.connect();

// 		connection.query( eQuery, function(err, rows, fields) {

// 			if (err) throw err;

// 			connection.end();

// 			return callback( null, 'OK' );

// 		});

// 	},


// 	/**
// 	 * Added by Jammi Dee 01/02/2011
// 	*/
// 	writeDB2Log: function( pMsg, callback ) {

// 		//Added by Jammi Dee 01/17/2018
// 		var colors = require('colors');
// 		colors.setTheme({
// 			silly:		'rainbow',
// 			input:		'grey',
// 			verbose:	'cyan',
// 			prompt:		'grey',
// 			info:		'green',
// 			data:		'grey',
// 			help:		'cyan',
// 			warn:		'yellow',
// 			debug:		'gray',
// 			error:		'red'
// 		});

// 		var strValue = 'OK';

// 		var path		= require('path');
// 		var nconf		= require('nconf');
// 		var os 			= require("os");
// 		var uuid		= require('node-uuid');
// 		var moment		= require('moment');
// 		var fs 			= require('fs');

// 		nconf.use('file', { file: path.join(__dirname, 'config.json') });

// 		var strDate 	= moment( new Date() ).format('YYYY-MM-DD');
// 		var strDBfile	= './dblogs/' + strDate + '.sql'

// 		if( nconf.get('cgSwDBLog') === "ON" ){
// 			console.log('---------->> Function Name: cglibhelper.js : writeDB2Log '.debug);

// 			try {
// 				if (fs.existsSync( strDBfile )) {

// 					//file exists
// 					var dblog = fs.createWriteStream( strDBfile , { flags: 'a' });
// 						dblog.write( pMsg + "\n");
// 						dblog.end();

// 				} else {

// 					var dblog = fs.createWriteStream( strDBfile , { flags: 'a' });
// 						dblog.write( pMsg + "\n");
// 						dblog.end();

// 				}
// 			} catch(err) {

// 				console.error(err);

// 			}

// 		} else {

// 			console.warn( "DBlogging is off..." );

// 		}

// 		return callback( null, 'OK' );

// 	},


	// /**
	//  * Added by Jammi Dee 10/02/2017
	// */
	// getMOTDay: function( callback ) {

	// 	//Added by Jammi Dee 01/17/2018
	// 	var colors = require('colors');
	// 	colors.setTheme({
	// 		silly:		'rainbow',
	// 		input:		'grey',
	// 		verbose:	'cyan',
	// 		prompt:		'grey',
	// 		info:		'green',
	// 		data:		'grey',
	// 		help:		'cyan',
	// 		warn:		'yellow',
	// 		debug:		'gray',
	// 		error:		'red'
	// 	});

	// 	//Update list by JMD - 07/12/2021
	// 	var quotes = [
	// 					["Stay Hungry. Stay Foolish.", "Steve Jobs"],
	// 					["Good Artists Copy, Great Artists Steal.", "Pablo Picasso"],
	// 					["Argue with idiots, and you become an idiot.", "Paul Graham"],
	// 					["Be yourself; everyone else is already taken.", "Oscar Wilde"],
	// 					["The way to get started is to quit talking and begin doing.", "Walt Disney"],
	// 					["Spread love everywhere you go. Let no one ever come to you without leaving happier.", "Mother Teresa"],
	// 					["When you reach the end of your rope, tie a knot in it and hang on.", "Roosevelt"],
	// 					["Tell me and I forget. Teach me and I remember. Involve me and I learn.", "Benjamin Franklin"],
	// 					["It is during our darkest moments that we must focus to see the light.", "Aristotle"],
	// 					["Whoever is happy will make others happy too.", "Anne Frank"],
	// 					["You will face many defeats in life, but never let yourself be defeated.", "Maya Angelou"],
	// 					["Never let the fear of striking out keep you from playing the game.", "Babe Ruth"],
	// 					["Life is either a daring adventure or nothing at all.", "Helen Keller"],
	// 					["Life is a succession of lessons which must be lived to be understood.", "Ralph Waldo"],
	// 					["The only impossible journey is the one you never begin.", "Tony Robbins"],
	// 					["Only a life lived for others is a life worthwhile.", "Albert Einstein"],
	// 					["The purpose of our lives is to be happy.", "Dalai Lama"],
	// 					["You only live once, but if you do it right, once is enough.", "Mae West"],
	// 					["Life is really simple, but we insist on making it complicated.", "Confucius"],
	// 					["Simplicity is the ultimate sophistication.", "Leonardo Da Vinci"]
	// 		];

	// 	var qindex = Math.floor(Math.random() * quotes.length );

	// 	var quote = quotes[qindex];

	// 	console.log( '======>>>>>> '.silly + quote + ' <<<<<<======'.silly );

	// 	return callback( null, quote );

	// },
	
	
// 	/**
// 	 * Added by Jammi Dee 09/13/2021
// 	 * @summary getCacheRegistry to cache a variable for a certain call. It
// 	 * will return the cache variable until the end count is reached
// 	 * unless reset by the setCacheRegistry. The function returns a JSON.
// 	 * @param varname The registry variable name to read string data and return the JSON of it.
// 	 * @param start The offset count where the system will start to be triggered its first cache.
// 	 * @param end The end of the count and start the loop again.
// 	 * @param {function} callback The function to be executed on result.
// 	 * @author Jammi Dee <jammidee.gmail.com>
// 	 * @copyright Connext Philippines 2021
// 	*/
// 	checkCacheRegistry: function( req, res, pentity, varname, pstart, pend, pbypass, callback ) {

// 		//Added by Jammi Dee 12/18/2017
// 		var cu = require('../../node_modules/cloudgate/cgutility.js');
		
// 		//Added by JMD 09/13/2021
// 		var cgreg 		= require('./cglibregistry.js');
// 		var sqlString 	= require('sqlString');
		
// 		var pAppId	= 'NA';
// 		var pUserId	= 'CACHE';
// 		var pDefa	= '0|NODATA|INSHAALLAH';
		
// 		//If true, always EXECUTE - JMD 09/18/2021
// 		if( pbypass === true ){
// 			//No data, execute
// 			var dataret = 'EXEC|0|7|1|9|19|72';
// 			return callback( null, dataret );
// 		}
		
// 		cgreg.readRegistryDefault( req, res, pentity, pAppId, pUserId, varname, pDefa , function(error, varValue ){
			
// 			cu.debuglogs( 'Read registry: '.error + varValue );
			
// 			//If not yet registered Request Execute
// 			if( varValue == pDefa){
			  
// 				//No data, execute
// 				var dataret = 'EXEC|0|7|1|9|19|72';
// 				return callback( null, dataret );
				
// 			} else {
				
// 				//Check if Expired COUNT|DATA
// 				var dataret = varValue;
// 				var dataSet = varValue.split('|');
				
// 				//Increment Counter
// 				if( parseInt(dataSet[0]) <= pend ){
// 					//Reset Counter
// 					dataSet[0] = (parseInt(dataSet[0]) + 1).toString();
// 					cgreg.writeRegistry( req, res, null, pentity, pAppId, pUserId, varname, dataSet.join('|') , function(error, varValue ){

// 						//Request No Exec
// 						//return callback( null, 'NOEXEC|' + dataSet.join('|') );

// 					}); //cgreg.writeRegistry
					
// 					//Request No Exec
// 					return callback( null, 'NOEXEC|' + dataSet.join('|') );
					
// 				} else {
					
// 					dataSet[0] = 1;
// 					cgreg.writeRegistry( req, res, null, pentity, pAppId, pUserId, varname, dataSet.join('|') , function(error, varValue ){

// 						//Request No Exec
// 						//return callback( null, 'NOEXEC|' + dataSet.join('|') );

// 					}); //cgreg.writeRegistry
					
// 					//Request No Exec
// 					return callback( null, 'NOEXEC|' + dataSet.join('|') );
					
// 				} //Increment Counter
				
// 				//Request execute
// 				if( parseInt(dataSet[0]) == pstart ){
					
// 					//Request Execute
// 					var dataret = 'EXEC|0|7|1|9|19|72';
// 					return callback( null, dataret );
					
// 				} //if( parseInt(dataSet[0])
				
// 			} //if( varValue == dDefa )
			
// 		}); //cgreg.readRegistryDefault

// 	},
		
// 	setCacheRegistry: function( req, res, pentity, varname, start, end, value, callback ) {

// 		//Added by Jammi Dee 12/18/2017
// 		var cu = require('../../node_modules/cloudgate/cgutility.js');
		
// 		//Added by JMD 09/13/2021
// 		var cgreg = require('../../node_modules/cloudgate/cglibregistry.js');
// 		var sqlString 			= require('sqlString');
		
// 		var pAppId	= 'NA';
// 		var pUserId	= 'CACHE';
// 		var dValue	= ( start ).toString() + '|' + value ;
		
// 		cu.debuglogs('Write to cache: '.error + sqlString.escape(dValue) );
		
// 		cgreg.writeRegistry( req, res, null,  pentity, pAppId, pUserId, varname, dValue , function(error, varValue ){
// 			cu.debuglogs('Data has been saved to the registry.'.error + varValue );
// 		});
		
// 		return callback( null, 'OK' );

// 	},
	
// 	/**
// 	 * Added by Jammi Dee 09/13/2021
// 	 * @summary getCacheRegistry to cache a variable for a certain call. It
// 	 * will return the cache variable until the end count is reached
// 	 * unless reset by the setCacheRegistry. The function returns a JSON.
// 	 * @param varname The registry variable name to read string data and return the JSON of it.
// 	 * @param start The offset count where the system will start to be triggered its first cache.
// 	 * @param end The end of the count and start the loop again.
// 	 * @param {function} callback The function to be executed on result.
// 	 * @author Jammi Dee <jammidee.gmail.com>
// 	 * @copyright Connext Philippines 2021
// 	*/
// 	checkCacheFile: function( req, res, pentity, varname, pstart, pend, pbypass, callback ) {

// 		var fs 			= require('fs');
		
// 		//Added by Jammi Dee 12/18/2017
// 		var cu = require('../../node_modules/cloudgate/cgutility.js');
		
// 		//Added by JMD 09/13/2021
// 		var cgreg 		= require('./cglibregistry.js');
// 		var sqlString 	= require('sqlString');
		
// 		var pAppId	= 'NA';
// 		var pUserId	= 'CACHE';
// 		var pDefa	= '0|NODATA|INSHAALLAH';
		
// 		//If true, always EXECUTE - JMD 09/18/2021
// 		if( pbypass === true ){
// 			//No data, execute
// 			var dataret = 'EXEC|0|7|1|9|19|72';
// 			return callback( null, dataret );
// 		}
		
// 		//If no cache file detected, request to execute
// 		var strCachefile	= './cachelogs/' + varname + '.json';
// 		if ( !fs.existsSync( strCachefile )) {
// 			//No data, execute
// 			var dataret = 'EXEC|0|7|1|9|19|72';
// 			return callback( null, dataret );
// 		}
		
// 		cgreg.readRegistryDefault( req, res, pentity, pAppId, pUserId, varname, pDefa , function(error, varValue ){
			
// 			cu.debuglogs( 'Read registry: '.error + varValue );
			
// 			//If not yet registered Request Execute
// 			if( varValue == pDefa){
			  
// 				//No data, execute
// 				var dataret = 'EXEC|0|7|1|9|19|72';
// 				return callback( null, dataret );
				
// 			} else {
				
// 				//Check if Expired COUNT|DATA
// 				var dataret = varValue;
// 				var dataSet = varValue.split('|');
				
// 				//Read the payload
// 				const data = fs.readFileSync( strCachefile , {encoding:'utf8', flag:'r'});
				
// 				//Increment Counter
// 				if( parseInt(dataSet[0]) <= pend ){
// 					//Reset Counter
// 					dataSet[0] = (parseInt(dataSet[0]) + 1).toString();
// 					cgreg.writeRegistry( req, res, null, pentity, pAppId, pUserId, varname, dataSet.join('|') , function(error, varValue ){

// 						//Request No Exec
// 						return callback( null, 'NOEXEC|' + dataSet[0] + '|' + data );

// 					}); //cgreg.writeRegistry
					
// 				} else {
					
// 					dataSet[0] = 1;
// 					cgreg.writeRegistry( req, res, null, pentity, pAppId, pUserId, varname, dataSet.join('|') , function(error, varValue ){

// 						//Request No Exec
// 						return callback( null, 'NOEXEC|' + dataSet[0] + '|' + data );

// 					}); //cgreg.writeRegistry
					
					
// 				} //Increment Counter
				
// 				//Request execute
// 				if( parseInt(dataSet[0]) == pstart ){
					
// 					//Request Execute
// 					var dataret = 'EXEC|0|7|1|9|19|72';
// 					return callback( null, dataret );
					
// 				} //if( parseInt(dataSet[0])
				
// 			} //if( varValue == dDefa )
			
// 		}); //cgreg.readRegistryDefault

// 	},
	
// 	setCacheFile: function( req, res, pentity, varname, start, end, value, extravalue, callback ) {

// 		//Added by Jammi Dee 12/18/2017
// 		var cu = require('../../node_modules/cloudgate/cgutility.js');
		
// 		//Added by JMD 09/13/2021
// 		var cgreg = require('../../node_modules/cloudgate/cglibregistry.js');
// 		var sqlString 			= require('sqlString');
		
// 		var pAppId	= 'NA';
// 		var pUserId	= 'CACHE';
// 		var dValue	= ( start ).toString() + '|' + value ;
		
// 		cu.debuglogs('Write to cache: '.error + sqlString.escape(dValue) );
		
// 		cgreg.writeRegistry( req, res, null,  pentity, pAppId, pUserId, varname, dValue , function(error, varValue ){
// 			cu.debuglogs('Data has been saved to the registry.'.error + varValue );
// 		});
		
// 		//Writw JSON to file.
// 		writeRegistryJson( varname, extravalue, function( error, result ){
			
// 		});
		
// 		return callback( null, 'OK' );

// 	},
		
    
// };

// 	/**
// 	 * Added by Jammi Dee 09/18/2011
// 	*/
// 	function writeRegistryJson( varname, pjson, callback ) {

// 		var path		= require('path');
// 		var nconf		= require('nconf');
// 		var fs 			= require('fs');
// 		//Added by Jammi Dee 09/18/2021
// 		var cu = require('../../node_modules/cloudgate/cgutility.js');

// 		nconf.use('file', { file: path.join(__dirname, 'config.json') });
// 		var strDBfile	= './cachelogs/' + varname + '.json';

// 		cu.debuglogs('---------->> Function Name: cglibhelper.js : writeRegistryJson '.debug);

// 		try {
			
// 			var cachelog = fs.createWriteStream( strDBfile , { flags: 'w' });
// 				cachelog.write( JSON.stringify( pjson ) );
// 				cachelog.end();
			
// 		} catch(err) {

// 			console.error(err);

// 		}

// 		return callback( null, 'OK' );

// 	}

   

