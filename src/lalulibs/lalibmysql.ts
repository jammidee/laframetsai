/** @module mySQL Module 

Star Upon my Life, Light Upon my Feet
by: Jammi Dee

As I walk along the night
With no path in sight
I am nothing on this trek
Walking for life in seek.

Then you shine on my sight
Then my soul is happy on light.
You're my light that greets
You're the light upon my feet.

You're the rose that bloom
That's adds beauty to see
In my world that's so gloom
You have sit me from it free.

You sheltered me w/ love
You raise me up above
You gave me direction
And give me full attention.

I love you cause of what
You are to me.
I love you because you love me
You strengthen me of it
You're the light upon my feet.

As problem becomes my obstacle
And I have none to come at all
You comforted my dizzy heart
And you sacrifice a part.

As past whisper to me
My mind starts to recollect
The ups and downs of life to see,
As we give color to our lives.

Of all the one I knew
You're the most important one
As I know to my self that's true
All my sorrow seems to gone.

Do you remember
Of all the things we shared
You give me much you to get
You're the light upon my feet.

*/

import * as dh from './lalibhelper';
// import colors from 'colors';
import path from 'path';
import nconf from 'nconf';
import mysql from 'mysql2';

interface ExecNonQueryCallback {
    (error: Error | null, result: string): void;
}

const execNonQuery = (req: any, res: any, next: any, pQuery: string, callback: ExecNonQueryCallback): void => {
    let strError: string | null = 'OK';

    nconf.use('file', { file: path.join(__dirname, 'config.json') });

    if (nconf.get('debugmode') === 'ON') {
        console.log('---------->>> Function Name: execNonQuery ');
    }

    const connection = mysql.createConnection({
        host: nconf.get('hostname'),
        user: nconf.get('username'),
        password: nconf.get('password'),
        database: nconf.get('database')
    });

    connection.connect();

    connection.query(pQuery, (err, _rows, _fields) => {
        if (!err) {
            if (nconf.get('cgSwDBLog') === 'ON') {
                if (pQuery.substr(0, 8).toUpperCase().indexOf('SELECT') === -1) {
                    // Assuming `dh` is properly imported or defined
                    // dh.writeDB2Log(pQuery, (_error, _resp) => {});
                }
            }

            console.log('---------->> execNonQuery: Script successfully executed!');

            if (nconf.get('debugmode') === 'ON') {
                console.log('---------->> execNonQuery: Query Executed:' + pQuery);
            }

            callback(null, 'OK');
        } else {
            console.log('execNonQuery: ERROR ---------->>' + err);
            strError = err.toString();;

            callback(err, 'FAILED');
        }
    });

    connection.on('error', (err) => {
        console.log('caught this error: ' + err.toString());
        // Passing the error to the callback if occurred during connection
        callback(err, 'FAILED');
    });

    connection.end();
};

interface GetTableDataCallback {
    (error: Error | null, result: any): void;
}

const getTableData = (req: any, res: any, next: any, pQuery: string, callback: GetTableDataCallback): void => {
    let strError: string | null = null;

    nconf.use('file', { file: path.join(__dirname, 'config.json') });

    if (nconf.get('debugmode') === 'ON') {
        console.log('---------->>> Function Name: getTableData ');
    }

    const connection = mysql.createConnection({
        host: nconf.get('hostname'),
        user: nconf.get('username'),
        password: nconf.get('password'),
        database: nconf.get('database')
    });

    connection.connect();

    connection.query(pQuery, (err, rows: any, _fields) => {
        if (!err) {
            if (nconf.get('cgSwDBLog') === 'ON') {
                if (pQuery.substr(0, 8).toUpperCase().indexOf('SELECT') === -1) {
                    // Assuming `dh` is properly imported or defined
                    // dh.writeDB2Log(pQuery, (_error, _resp) => {});
                }
            }

            console.log('---------->> getTableData: Query Executed!');

            if (nconf.get('debugmode') === 'ON') {
                console.log('---------->> getTableData: Query Executed:' + pQuery);
            }

            callback(null, rows);
            res.json(rows);
        } else {
            console.log('getTableData: ERROR ---------->>' + err);
            strError = err.toString();

            callback(err, strError);
        }
    });

    connection.on('error', (err) => {
        console.log('caught this error: ' + err.toString());
        // Passing the error to the callback if occurred during connection
        callback(err, 'FAILED');
    });

    connection.end();
};

export { execNonQuery, getTableData };


// module.exports = {
    
   
//     /*
//       Added by Jammi Dee 09/04/2017
//     */
//     /**
//      * This function executes a query againts MySQL and it does not
//      * return any value.
//      * @function
//      * @summary Function that executes a query on MySQL.
//      * @param {object} req - Request object.
//      * @param {object} res - Result object.
//      * @param {object} next - Next object.
//      * @param {string} pQuery - The query to be executed.
//      * @returns {string} Operation result
//      * @author Jammi Dee <jammidee.gmail.com>
//      * @copyright Lalulla OPC 2012-2022
//      */
//     execNonQuery: function( req, res, next, pQuery, callback ) {
        
//         /* Required library for the Lalulla System */
//         var dh = require('./lalibhelper.js');
        
//         //Added by Jammi Dee 01/17/2018
//         var colors = require('colors');
//         colors.setTheme({
//             silly: 		'rainbow',
//             input: 		'grey',
//             verbose: 	'cyan',
//             prompt: 	'grey',
//             info: 		'green',
//             data: 		'grey',
//             help: 		'cyan',
//             warn: 		'yellow',
//             debug: 		'gray',
//             error: 		'red'
//         });
        
//         var strError ='OK';
            
//         var path    = require('path');
//         var nconf   = require('nconf');
//         nconf.use('file', { file: path.join(__dirname, 'config.json') });
        
//         if( nconf.get('debugmode') === "ON" ){
//             console.log('---------->>> Function Name: execNonQuery '.debug);
//         }
        
//         var mysql      = require('mysql');
//         var connection = mysql.createConnection({
//             host     : nconf.get('hostname') ,
//             user     : nconf.get('username') ,
//             password : nconf.get('password') ,
//             database : nconf.get('database')
//         });
    
//         connection.connect();
    
//         connection.query( pQuery, function(err, rows, fields) {
//             if (!err){
                
//                 // This is where we inject the DBlogging
//                 if( nconf.get('cgSwDBLog') === "ON" ){
//                     if( pQuery.substr( 0, 8 ).toUpperCase().indexOf("SELECT") == -1 ){
//                         dh.writeDB2Log( pQuery, function( error, resp ){	});
//                     }
//                 }
                
//                 console.log('---------->> execNonQuery: Script successfully executed!'.info );
                
//                 if( nconf.get('debugmode') === "ON" ){
//                     console.log('---------->> execNonQuery: Query Executed:'.debug + pQuery );
//                 }
                
//                 return callback( null, 'OK' );
                
//             } else {
            
//                 console.log('execNonQuery: ERROR ---------->>'.error + err );
//                 strError = err;
                
//                 return callback( null, 'FAILED' );
         
//             }
            
//         });
        
//         connection.on('error', function (err) {
//             console.log('caught this error: ' + err.toString());
//         });
    
//         connection.end();
        
//       },
        
        
        
    
//     /*
//       Added by Jammi Dee 09/04/2017
//     */
//     /**
//      * This function executes a query againts MySQL and returns the
//      * result of the query.
//      * @function
//      * @summary Function that executes a query on MySQL and returns a resultset.
//      * @param {object} req - Request object.
//      * @param {object} res - Result object.
//      * @param {object} next - Next object.
//      * @param {string} pQuery - The query to be executed.
//      * @returns {json} Resultset from the query
//      * @author Jammi Dee <jammidee.gmail.com>
//      * @copyright Lalulla OPC 2012-2022
//      */
//     getTableData: function( req, res, next, pQuery, callback ) {
        
//         /* Required library for the Lalulla System */
//         var dh = require('./lalibhelper.js');
        
//         //Added by Jammi Dee 01/17/2018
//         var colors = require('colors');
//         colors.setTheme({
//             silly: 		'rainbow',
//             input: 		'grey',
//             verbose: 	'cyan',
//             prompt: 	'grey',
//             info: 		'green',
//             data: 		'grey',
//             help: 		'cyan',
//             warn: 		'yellow',
//             debug: 		'gray',
//             error: 		'red'
//         });
        
//         var strError ='OK';
            
//         var path	= require('path');
//         var nconf	= require('nconf');
//         nconf.use('file', { file: path.join(__dirname, 'config.json') });
        
//         if( nconf.get('debugmode') === "ON" ){
//             console.log('---------->>> Function Name: execNonQuery '.debug);
//         }
        
//         var mysql		= require('mysql');
//         var connection	= mysql.createConnection({
//             host		: nconf.get('hostname') ,
//             user		: nconf.get('username') ,
//             password	: nconf.get('password') ,
//             database	: nconf.get('database')
//         });
    
//         connection.connect();
    
//         connection.query( pQuery, function(err, rows, fields) {
//             if (!err){
                
//                 // This is where we inject the DBlogging
//                 if( nconf.get('cgSwDBLog') === "ON" ){
//                     if( pQuery.substr( 0, 8 ).toUpperCase().indexOf("SELECT") == -1 ){
//                         dh.writeDB2Log( pQuery, function( error, resp ){	});
//                     }
//                 }
                
//                 console.log('---------->> execNonQuery: Script successfully executed!'.info );
                
//                 if( nconf.get('debugmode') === "ON" ){
//                     console.log('---------->> execNonQuery: Query Executed:'.debug + pQuery );
//                 }
            
//                 return callback( 0 , rows );
//                 res.json(rows);
                
//             } else {
            
//                 console.log('execNonQuery: ERROR ---------->>'.error + err );
//                 strError = err;
                
//                 //res.send( 'error: ' + strError );
//                 return callback( 1 , strError );
         
//             }
            
//         });
    
//         connection.on('error', function (err) {
//             console.log('caught this error: ' + err.toString());
//         });
        
//         connection.end();
        
//     },
    
        
//     /*
//       Added by Jammi Dee 07/14/2018
//     */
//     /**
//      * This function is a wrapper to SqlString to make it globalized in order to protect
//      * sql string statement from SQL injection.
//      * @function
//      * @summary Function that escapes sql string to avoid malformed sql string due to user input..
//      * @param {string} sdata - the string to be escaped.
//      * @returns {string} new sql escaped string
//      * @author Jammi Dee <jammidee.gmail.com>
//      * @copyright Lalulla OPC 2012-2022
//      */
//     sqlEsc: function( sData, callback ) {
        
//         //Added by Jammi Dee 01/17/2018
//         var colors = require('colors');
//         colors.setTheme({
//             silly: 		'rainbow',
//             input: 		'grey',
//             verbose: 	'cyan',
//             prompt: 	'grey',
//             info: 		'green',
//             data: 		'grey',
//             help: 		'cyan',
//             warn: 		'yellow',
//             debug: 		'gray',
//             error: 		'red'
//         });
        
//         var strError ='OK';
            
//         var path	= require('path');
//         var nconf	= require('nconf');
//         nconf.use('file', { file: path.join(__dirname, 'config.json') });
        
//         if( nconf.get('debugmode') === "ON" ){
//             console.log('---------->>> Function Name: sqlEsc '.debug);
//         }
        
//         //NPM Module
//         var SqlString = require('sqlstring');
        
//         var newData = SqlString.escape(sData);
        
//         return callback( null, newData );
        
//     },
        
        
// };
    
       
    
    