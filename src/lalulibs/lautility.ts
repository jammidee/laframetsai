/** @module Utility Module 

Free Wings
by Jammi Dee

As I move on to my trek,
I feel the wonder of nature.
As my free wings fly
Never ending stories,
No beginning scripts
As my free association comes.

I can still feel that hot sun
As a day fly off to the azure sky
Feeling the kiss of the chilly air
Telling, feel the chilly love 
The love of my love has clothe me.
She cloth me as I go along 
She cares when I break my wings
She let me wonder my natural freedom in dream.
I remember fast end I was fascinated
I wake up and wow
What a wonderful morning
The sun shine bring warm
As the soft pillow caress my head it bring.
I thought I hope I could fly as
In the dream, my free wings out
I made a promise to make each day better.

Thanks to my free wings

What a wonderful dream

As the silhouette of the mountain
There the skyline seen
It seem fading, letting its beauty out.
Even I feel the same I hope I still have the word best.

Why they like a man when he is dead.
There promise never last
To remember him forever.

*/


import path from 'path';
import nconf from 'nconf';
import mysql from 'mysql2';

interface WriteErrorMessageCallback {
    (error: Error | null, result: any): void;
}

interface DebugLogsCallback {
    (logText: string): void;
}

interface ColorFunction {
    (perc: number): string;
}

interface GetColorBySetIndexCallback {
    (pset: string, index: number): string;
}

const writeErrorMessage = (req: any, rows: any, moduleid: string, process: string): void => {
    var ch = require('./lalibhelper.js');

    let pEntity: any = req.session.entityid;
    let pAppId: any = req.session.cgAppId;
    let pUserId: any = req.session.userid;
    let pModuleid: string = moduleid;
    let pProcess: string = process;
    let pScopeId: string = 'SQLERROR';
    let pStype: string = 'USER';

    var errormessage = rows.sqlMessage;
    var errormessage = errormessage.replace(/'/g, " ");
    console.log(errormessage.error);
    ch.writeAppLog(pUserId, errormessage, pModuleid, pAppId, pProcess, pScopeId, pStype, pEntity, function( error: Error | null, result: any ) {

    });
};

const debuglogs: DebugLogsCallback = (logText: string) => {
    // var path    = require('path');
    // var nconf   = require('nconf');
    nconf.use('file', { file: path.join(__dirname, './config.json') });
    
    if(nconf.get('debugmode') === 'ON'){
        console.log( logText );
    }
};

const perc2color: ColorFunction = (perc: number) => {
    var r, g, b = 0;
    if(perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
};

const perc2colorbg: ColorFunction = (perc: number) => {
    var Gradient = require("javascript-color-gradient");
    const colorGrad = new Gradient();
    
    const color1 = "#09a4b9";
    const color2 = "#e9446a";
    const color3 = "#edc988";
    const color4 = "#178303";
    
    colorGrad.setMidpoint(10);
    colorGrad.setGradient(color1, color2, color3, color4);
    var colo = colorGrad.getColor( Math.ceil((perc/100) * 20) );
    
    return colo;
};

const getColorBySetIndex: GetColorBySetIndexCallback = (pset: string, index: number) => {
    var j = [
        //Original
        'rgba(67, 134, 240, 0.9)',
        'rgba(121, 239, 61 , 0.9)',
        'rgba(239, 77, 61, 0.9)',
        'rgba(219, 231, 22, 0.9)',
        'rgba(245, 7, 238, 0.9)',
        'rgba(7, 245, 218 , 0.9)',
        'rgba(105,105,179, 0.9)',
        'rgba(83,58,123, 0.9)',
        'rgba(246, 136, 5, 0.9)',
        'rgba(238, 30, 169, 0.9)',
        'rgba(67, 134, 240, 0.9)',
        'rgba(121, 239, 61 , 0.9)',
        'rgba(239, 77, 61, 0.9)',
        'rgba(219, 231, 22, 0.9)',
        'rgba(245, 7, 238, 0.9)',
        'rgba(7, 245, 218 , 0.9)',
        'rgba(105,105,179, 0.9)',
        'rgba(83,58,123, 0.9)',
        'rgba(246, 136, 5, 0.9)',
        'rgba(238, 30, 169, 0.9)',
        'rgba(219, 231, 22, 0.9)',
        'rgba(245, 7, 238, 0.9)',
        'rgba(7, 245, 218 , 0.9)',
        'rgba(105,105,179, 0.9)',
        'rgba(83,58,123, 0.9)',
        'rgba(246, 136, 5, 0.9)',
        'rgba(238, 30, 169, 0.9)'
    ];

    var o = [
        //Trove
        'rgba(81,87,74,1)',
        'rgba(68,124,105,1)',
        'rgba(116,196,147,1)',
        'rgba(142,140,109,1)',
        'rgba(228,191,128,1)',
        'rgba(233,215,142,1)',
        'rgba(226,151,93,1)',
        'rgba(241,150,112,1)',
        'rgba(225,101,82,1)',
        'rgba(201,74,83,1)',
        'rgba(190,81,104,1)',
        'rgba(163,73,116,1)',
        'rgba(153,55,103,1)',
        'rgba(101,56,125,1)',
        'rgba(78,36,114,1)',
        'rgba(145,99,182,1)',
        'rgba(226,121,163,1)',
        'rgba(224,89,139,1)',
        'rgba(124,159,176,1)',
        'rgba(86,152,196,1)',
        'rgba(154,191,136,1)',
        'rgba(81,87,74,1)',
        'rgba(68,124,105,1)',
        'rgba(116,196,147,1)',
        'rgba(142,140,109,1)',
        'rgba(228,191,128,1)',
        'rgba(233,215,142,1)'
        ];

    var e = [
        //Red-To-Gray
        'rgba(255,20,23,1)',
        'rgba(255,102,17,1)',
        'rgba(255,136,68,1)',
        'rgba(255,238,85,1)',
        'rgba(254,254,56,1)',
        'rgba(255,255,153,1)',
        'rgba(170,204,34,1)',
        'rgba(187,221,119,1)',
        'rgba(200,207,130,1)',
        'rgba(146,167,126,1)',
        'rgba(85,153,238,1)',
        'rgba(0,136,204,1)',
        'rgba(34,102,136,1)',
        'rgba(23,82,121,1)',
        'rgba(85,119,119,1)',
        'rgba(221,187,51,1)',
        'rgba(211,167,109,1)',
        'rgba(169,131,75,1)',
        'rgba(170,102,136,1)',
        'rgba(118,118,118,1)',
        'rgba(255,20,23,1)',
        'rgba(255,102,17,1)',
        'rgba(255,136,68,1)',
        'rgba(255,238,85,1)',
        'rgba(254,254,56,1)',
        'rgba(255,255,153,1)',
        'rgba(170,204,34,1)'
        ];

    var l = [
        //Legend 16
        'rgba(25,129,0,1)',
        'rgba(77,195,44,1)',
        'rgba(190,244,61,1)',
        'rgba(56,126,115,1)',
        'rgba(51,193,153,1)',
        'rgba(135,255,157,1)',
        'rgba(36,105,186,1)',
        'rgba(117,207,250,1)',
        'rgba(189,93,253,1)',
        'rgba(137,27,176,1)',
        'rgba(241,99,145,1)',
        'rgba(254,173,192,1)',
        'rgba(198,40,28,1)',
        'rgba(249,90,0,1)',
        'rgba(255,158,50,1)',
        'rgba(255,224,122,1)',
        'rgba(25,129,0,1)',
        'rgba(77,195,44,1)',
        'rgba(190,244,61,1)',
        'rgba(56,126,115,1)',
        'rgba(51,193,153,1)',
        'rgba(135,255,157,1)',
        'rgba(36,105,186,1)',
        'rgba(117,207,250,1)',
        'rgba(189,93,253,1)',
        'rgba(137,27,176,1)',
        'rgba(241,99,145,1)'
        ];

    var gr = [
        //Gradient Green
        'rgba(0,69,41,1)',
        'rgba(0,104,55,1)',
        'rgba(35,132,67,1)',
        'rgba(65,171,93,1)',
        'rgba(120,198,121,1)',
        'rgba(173,221,142,1)',
        'rgba(217,240,163,1)',
        'rgba(247,252,185,1)',
        'rgba(255,255,229,1)',
        'rgba(0,69,41,1)',
        'rgba(0,104,55,1)',
        'rgba(35,132,67,1)',
        'rgba(65,171,93,1)',
        'rgba(120,198,121,1)',
        'rgba(173,221,142,1)',
        'rgba(217,240,163,1)',
        'rgba(247,252,185,1)',
        'rgba(255,255,229,1)',
        'rgba(0,69,41,1)',
        'rgba(0,104,55,1)',
        'rgba(35,132,67,1)',
        'rgba(65,171,93,1)',
        'rgba(120,198,121,1)',
        'rgba(173,221,142,1)',
        'rgba(217,240,163,1)',
        'rgba(247,252,185,1)',
        'rgba(255,255,229,1)'
        ];

    var bg = [
        //Gradient Blue - Green
        'rgba(34,157,206,1)',
        'rgba(55,167,182,1)',
        'rgba(99,192,138,1)',
        'rgba(142,215,94,1)',
        'rgba(165,227,72,1)',
        'rgba(202,201,208,1)',
        'rgba(34,157,206,1)',
        'rgba(55,167,182,1)',
        'rgba(99,192,138,1)',
        'rgba(142,215,94,1)',
        'rgba(165,227,72,1)',
        'rgba(202,201,208,1)',
        'rgba(34,157,206,1)',
        'rgba(55,167,182,1)',
        'rgba(99,192,138,1)',
        'rgba(142,215,94,1)',
        'rgba(165,227,72,1)',
        'rgba(202,201,208,1)',
        'rgba(34,157,206,1)',
        'rgba(55,167,182,1)',
        'rgba(99,192,138,1)',
        'rgba(142,215,94,1)',
        'rgba(165,227,72,1)',
        'rgba(202,201,208,1)'
        ];

    if( pset == 'j' ){

        return j[index];

    } else if( pset == 'o' ) {
        
        return o[index];
        
    } else if( pset == 'e' ) {
        
        return e[index];
        
    } else if( pset == 'l' ) {
        
        return l[index];
        
    } else if( pset == 'gr' ) {
        
        return gr[index];

    } else if( pset == 'bg' ) {
        
        return bg[index];
        
    } else {
        
        return j[index];
        
    }
}; //getColorBySetIndex: function (pset, index)

export {
    writeErrorMessage,
    debuglogs,
    perc2color,
    perc2colorbg,
    getColorBySetIndex
};


// module.exports = {
    
   
//     /*
//       Added by Jammi Dee 09/12/2017
//     */
//     /**
     
//         /**
//          * Added by JMD 09/11/2017.
//          * This function get the CPU usage.
//          * @summary Function that determines CPU usage.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getCPUUsage: function( callback ) {
    
//             var os 	= require('os-utils');
    
//             os.cpuUsage(function( CPUUsage ){
    
//                 var vUsage = parseFloat( CPUUsage * 100 ).toFixed(2);
    
//                 console.log( 'CPU Usage (%): ' + vUsage );
//                 return callback(null, vUsage );
    
//             });
    
//         },
    
//         /**
//          * Added by JMD 09/11/2017
//          * This function get the CPU Free compute.
//          * @summary Function that determines free CPU compute.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getCPUFree: function( callback ) {
    
//             var os 	= require('os-utils');
    
//             os.cpuFree(function( CPUFree ){
    
//                 var vFree = parseFloat( CPUFree * 100 ).toFixed(2);
    
//                 console.log( 'CPU Usage (%): ' + vFree );
//                 return callback(null, vFree );
    
//             });
    
//         },
    
    
//         /**
//          * Added by JMD 09/15/2017
//          * This function get the app current memory information.
//          * @summary Function that determines memory availability.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getMemInfo: function( callback ) {
    
//             var osu 	= require('node-os-utils');
//             var mem	= osu.mem;
    
//             mem.info().then(info =>{
//                 return callback(null, info );
//             });
    
    
//         },
    
//         /**
//          * Added by Jammi Dee 09/14/2017
//         */
//         getOperatingSystem: function( callback ) {
    
//             var async_exec = require('child_process').exec;
    
//             var os = require('os');
    
//             return callback(null, os.platform() );
    
//         },
    
//         /**
//          * Added by JMD 10/18/2017
//          * This function get the app host storage information.
//          * @summary Function that determines storage availability.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getDiskUsage: function( callback ) {
    
//             var diskspace = require('diskspace');
    
//             diskspace.check('C', function (err, result) {
    
//                 return callback(null, result );
    
//                 //result.total
//                 //result.used
//                 //result.free
//                 //result.status
    
//             });
    
    
//         },
        
        
//         /**
//          * Added by JMD 12/19/2017
//          * This function gets the path where the node application is installed.
//          * @summary Function that get the location of the nodeJS working directory.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getLocalPath: function( filePath, callback ) {
    
//             console.log( 'Current Path: ' + filePath );
    
//             if(filePath !== '' && filePath != null){
    
//                 //We get a passed path from node_mudules
//                 if( filePath.indexOf('node_modules') > 0 ){
    
//                     //Get the path above the current
//                     var sepIndex 	= filePath.indexOf('node_modules');
//                     var filePath2 	= filePath.substring(0, sepIndex-12); //sepIndex-12 = length of 'node_modules'
    
//                     if(sepIndex == -1){
    
//                         //Get the path above the current
//                         sepIndex = filePath.indexOf('node_modules');
//                         var filePath2 	= filePath.substring(0, sepIndex-12);
    
//                     }
    
//                     return callback(null, filePath.substring(0, sepIndex) );
    
//                 }
    
//                 //We get a passed path from routes
//                 if( filePath.indexOf('routes') > 0 ){
    
//                     //Get the path above the current
//                     var sepIndex 	= filePath.indexOf('routes');
//                     var filePath2 	= filePath.substring(0, sepIndex-6); //sepIndex-6 = length of 'routes'
    
//                     if(sepIndex == -1){
    
//                         //Get the path above the current
//                         sepIndex = filePath.indexOf('routes');
//                         var filePath2 	= filePath.substring(0, sepIndex-6);
    
//                     }
    
//                     return callback(null, filePath.substring(0, sepIndex) );
    
//                 }
    
    
    
//                 //return callback(null, filePath.substring(0, sepIndex) );
    
//             }
    
//         },
        
        
//         /**
//          * Added by JMD 10/04/2018
//          * This function get the possible parties that can log into the system.
//          * @summary Function that get all the possible parties in the system.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
    
//             //sink test
//         getAllParties: function( req, res, next, keyid, callback ) {
    
//             var cgmy = require('./cglibmysql.js');
            
//             var pEntity		= req.session.entityid;
            
//             var Lquery = 'select juid, entityid, cuserid as id, cname as name from wgenUsers where entityid =\'' + pEntity + '\';';
//             var Dquery = 'select juid, entityid, drid as id, drname as name from wgenDoctors where entityid =\'' + pEntity + '\';';
//             var Gquery = 'select juid, entityid, userid as id, CONCAT(firstname,\'' + ' ' + '\',lastname) as name from tbluser where entityid =\'' + pEntity + '\';';
//             var Pquery = 'select juid, entityid, patientid as id, CONCAT(fname,\'' + ' ' + '\',lname) as name from wgenPatients where entityid =\'' + pEntity + '\';';
            
//             console.log('QUERY===>>>' .error + Gquery);
    
//             if(keyid == '' || keyid == 'ALL') {
    
//                 var type = 'ALL';
    
//                 cgmy.getTableData(req, res, next, Lquery, function( error, localuser ) {
//                     cgmy.getTableData(req, res, next, Dquery, function( error, doctor ) {
//                         cgmy.getTableData(req, res, next, Gquery, function( error, globaluser ) {
//                             cgmy.getTableData(req, res, next, Pquery, function( error, patient ) {
    
//                                 var users = {
//                                     'GLOBALUSER' 	: globaluser,
//                                     'LOCALUSER' 	: localuser,
//                                     'DOCTOR' 		: doctor,
//                                     'PATIENT' 		: patient
//                                 }
    
//                                 return callback(null, type, users);
//                             });
//                         });
//                     });
//                 });
    
//             } else if(keyid == 'GLOBALUSER') {
    
//                 var type = 'GLOBALUSER';
    
//                 cgmy.getTableData(req, res, next, Gquery, function( error, globaluser ) {
    
//                         return callback(null, type, globaluser);
//                 });
    
//             } else if(keyid == 'LOCALUSER') {
    
//                 var type = 'LOCALUSER';
    
//                 cgmy.getTableData(req, res, next, Lquery, function( error, localuser ) {
    
//                         return callback(null, type, localuser);
//                 });
    
//             } else if(keyid == 'DOCTOR') {
    
//                 var type = 'DOCTOR';
    
//                 cgmy.getTableData(req, res, next, Dquery, function( error, doctor ) {
    
//                         return callback(null, type, doctor);
//                 });
    
//             } else if(keyid == 'PATIENT') {
    
//                 var type = 'PATIENT';
    
//                 cgmy.getTableData(req, res, next, Pquery, function( error, patient ) {
    
//                         return callback(null, type, patient);
//                 });
    
//             }
//         },
        
//         /**
//          * Added by JMD 07/19/2021
//          * This function assigns rights to user roles so that they can log into the system.
//          * @summary Function that assign rights to user roles in the system.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         generateRoleRights02: function( req, res, next, dataSet, strEntity, strAppId, pPrefix, role, callback ) {
    
//             var cgmy = require('./cglibmysql.js');
//             var ch	 = require('./cglibhelper.js');
//             var uuid = require('node-uuid');
    
//             // Added by JMD 09/26/2017
//             pEntity			= strEntity; //req.session.entityid;
//             pAppId			= strAppId; //req.session.cgAppId;
//             pUserId			= 'SADMIN'; //req.session.userid;
//             pMsg			= 'Initializing Security rights.';
//             pModuleid		= 'LOOKUP';
//             pProcess		= 'INITIALIZE';
//             pScopeId		= 'NA';
//             pStype			= 'USER';
    
//             var rightsVals		= [];
//             var rightsasgnVals	= [];
    
//             ch.writeAppLog(pUserId, pMsg, pModuleid, pAppId, pProcess, pScopeId, pStype, pEntity, function( error, result ){
    
//                 var mysql		= require('mysql');
//                 var nconf   	= require('nconf');
//                 var path   		= require('path');
    
//                 nconf.use('file', { file: path.join(__dirname, 'config.json') });
    
//                 var connection	= mysql.createConnection({
//                     host		: nconf.get('hostname') ,
//                     user		: nconf.get('username') ,
//                     password	: nconf.get('password') ,
//                     database	: nconf.get('database')
//                 });
    
    
//                 // ----------------------------------------------------------
//                 // Generate here all the possible rights of the application.
//                 // Make sure that all the rights inside the the application
//                 // are declared here.
//                 // ----------------------------------------------------------
//                 for(var i = 0; i < dataSet.length; i++){
    
//                     var row 		= dataSet[i];
//                     var prightid 	= pPrefix + row.rightid;
//                     var pdesc 		= row.description;
    
//                     var valuesRow	= [uuid.v4(), pEntity, pAppId, prightid, pdesc];
    
//                     //console.log(valuesRow);
    
//                     // Create an array of values for bulk push to the
//                     // database later - JMD 07/20/2021
//                     rightsVals.push(valuesRow);
    
//                     // At the end of the loop, push to database rights
//                     if(i == dataSet.length - 1) {
    
//                         pQuery1 = 'insert into tblRights(juid, entityid, appid, rightid, description ) values ?';
    
//                         ////console.log('---------->>> Add Rights no: ' + i + ' : ' + pQuery );
    
//                         connection.query( pQuery1, [rightsVals], function(err, rows) {
    
//                             if (err) throw err;
    
//                             //console.log('THIS IS ROWS : ===========> ' + JSON.stringify(rows));
    
//                         });
    
//                         //-----------------------------------------
//                         // Generate Role / Rights combination here
//                         //-----------------------------------------
//                         for(var x = 0; x < dataSet.length; x++){
    
//                             var row 		= dataSet[x];
//                             var prightid 	= pPrefix + row.rightid;
//                             var pdesc 		= row.description;
    
//                             var valuesRow	= [uuid.v4(), pEntity, role, prightid, pdesc, pAppId];
    
//                             //console.log(valuesRow);
    
//                             rightsasgnVals.push(valuesRow);
    
//                             if(x == dataSet.length - 1) {
    
//                                 qQuery1 = 'insert into tblRightAsgn(juid, entityid, roleid, rightid, description, appid ) values ?';
    
//                                 ////console.log('---------->>> Add Right Assignment no: ' + x + ' : ' + qQuery1 );
    
//                                 connection.query( qQuery1, [rightsasgnVals], function(err, rows) {
    
//                                     if (err) throw err;
//                                     connection.end();
    
//                                 });
    
//                                 //res.send( 'OK - The rights has been generated! generated rights in total of : ' + rightsasgnVals.length);
//                                 //res.send( 'OK - The rights has been generated!');
    
//                                 return callback('<p>OK - The rights for "'+ role +'" has been generated!</p>');
    
//                             }
//                         }
//                     }
//                 }
//             });
//         },
        
//         /**
//          * Added by JMD 06/05/2022
//          * This function assigns rights to user roles so that they can log into the system.
//          * @summary Function that assign rights to user roles in the system.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         generateRoleRights: function( req, res, next, dataSet, strEntity, strAppId, pPrefix, role, callback ) {
    
//             var cgmy = require('./cglibmysql.js');
//             var ch	 = require('./cglibhelper.js');
//             var uuid = require('node-uuid');
    
//             // Added by JMD 09/26/2017
//             pEntity			= strEntity; //req.session.entityid;
//             pAppId			= strAppId; //req.session.cgAppId;
//             pUserId			= 'SADMIN'; //req.session.userid;
//             pMsg			= 'Initializing Security rights.';
//             pModuleid		= 'LOOKUP';
//             pProcess		= 'INITIALIZE';
//             pScopeId		= 'NA';
//             pStype			= 'USER';
    
//             var rightsVals		= [];
//             var rightsasgnVals	= [];
    
//             ch.writeAppLog(pUserId, pMsg, pModuleid, pAppId, pProcess, pScopeId, pStype, pEntity, function( error, result ){
    
//                 var mysql		= require('mysql');
//                 var nconf   	= require('nconf');
//                 var path   		= require('path');
    
//                 nconf.use('file', { file: path.join(__dirname, 'config.json') });
    
//                 var connection	= mysql.createConnection({
//                     host		: nconf.get('hostname') ,
//                     user		: nconf.get('username') ,
//                     password	: nconf.get('password') ,
//                     database	: nconf.get('database')
//                 });
    
    
//                 // ----------------------------------------------------------
//                 // Generate here all the possible rights of the application.
//                 // Make sure that all the rights inside the the application
//                 // are declared here.
//                 // ----------------------------------------------------------
//                 for(var i = 0; i < dataSet.length; i++){
    
//                     var row 		= dataSet[i];
//                     var prightid 	= pPrefix + row.rightid;
//                     var pdesc 		= row.description;
    
//                     var valuesRow	= [uuid.v4(), pEntity, pAppId, prightid, pdesc];
//                     //var valuesRow	= [uuid.v4(), pEntity, pAppId, prightid, pdesc, row.m, row.c, row.u, row.d, row.l, row.s, row.rr];
    
//                     //console.log(valuesRow);
    
//                     // Create an array of values for bulk push to the
//                     // database later - JMD 07/20/2021
//                     rightsVals.push(valuesRow);
    
//                     // At the end of the loop, push to database rights
//                     if(i == dataSet.length - 1) {
    
//                         pQuery1 = 'insert into tblRights(juid, entityid, appid, rightid, description ) values ?';
//                         //pQuery1 = 'insert into tblRights(juid, entityid, appid, rightid, description, manageright, createright, readright, updateright, deleteright, reportright, lookupright, searchright ) values ?';
    
//                         ////console.log('---------->>> Add Rights no: ' + i + ' : ' + pQuery );
    
//                         connection.query( pQuery1, [rightsVals], function(err, rows) {
    
//                             if (err) throw err;
    
//                             //console.log('THIS IS ROWS : ===========> ' + JSON.stringify(rows));
    
//                         });
    
//                         //-----------------------------------------
//                         // Generate Role / Rights combination here
//                         //-----------------------------------------
//                         for(var x = 0; x < dataSet.length; x++){
    
//                             var row 		= dataSet[x];
//                             var prightid 	= pPrefix + row.rightid;
//                             var pdesc 		= row.description;
    
//                             var valuesRow	= [uuid.v4(), pEntity, role, prightid, pdesc, pAppId, row.m, row.c, row.r, row.u, row.d, row.l, row.s, row.rr, row.x1, row.x2, row.x3, row.x4, row.xx];
    
//                             //console.log(valuesRow);
    
//                             rightsasgnVals.push(valuesRow);
    
//                             if(x == dataSet.length - 1) {
    
//                                 qQuery1 = 'insert into tblRightAsgn(juid, entityid, roleid, rightid, description, appid, manageright, createright, readright, updateright, deleteright, lookupright, searchright, reportright, extraright, extraright2, extraright3, extraright4, extrarightx  ) values ?';
    
//                                 ////console.log('---------->>> Add Right Assignment no: ' + x + ' : ' + qQuery1 );
    
//                                 connection.query( qQuery1, [rightsasgnVals], function(err, rows) {
    
//                                     if (err) throw err;
//                                     connection.end();
    
//                                 });
    
//                                 //res.send( 'OK - The rights has been generated! generated rights in total of : ' + rightsasgnVals.length);
//                                 //res.send( 'OK - The rights has been generated!');
    
//                                 return callback('<p>OK - The rights for "'+ role +'" has been generated!</p>');
    
//                             }
//                         }
//                     }
//                 }
//             });
//         },
        
//         /**
//          * Added by JMD 10/04/2018
//          * This function assigns rights to user roles so that they can log into the system.
//          * @summary Function that assign rights to user roles in the system.
//          * @param {function} callback The function to be executed on result.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         getRoleRights: function( req, res, next, dataSet, strEntity, strAppId, pPrefix, role, callback ) {
    
//             var cgmy = require('./cglibmysql.js');
//             var ch	 = require('./cglibhelper.js');
//             var uuid = require('node-uuid');
    
//             // Added by JMD 09/26/2017
//             pEntity			= strEntity; //req.session.entityid;
//             pAppId			= strAppId; //req.session.cgAppId;
//             pUserId			= 'SADMIN'; //req.session.userid;
//             pMsg			= 'Initializing Security rights.';
//             pModuleid		= 'LOOKUP';
//             pProcess		= 'INITIALIZE';
//             pScopeId		= 'NA';
//             pStype			= 'USER';
    
//             var rightsVals		= [];
//             var rightsasgnVals	= [];
    
//             ch.writeAppLog(pUserId, pMsg, pModuleid, pAppId, pProcess, pScopeId, pStype, pEntity, function( error, result ){
    
//                 var mysql		= require('mysql');
//                 var nconf   	= require('nconf');
//                 var path   		= require('path');
    
//                 nconf.use('file', { file: path.join(__dirname, 'config.json') });
    
//                 var connection	= mysql.createConnection({
//                     host		: nconf.get('hostname') ,
//                     user		: nconf.get('username') ,
//                     password	: nconf.get('password') ,
//                     database	: nconf.get('database')
//                 });
    
    
//                 // ----------------------------------------------------------
//                 // Generate here all the possible rights of the application.
//                 // Make sure that all the rights inside the the application
//                 // are declared here.
//                 // ----------------------------------------------------------
//                 for(var i = 0; i < dataSet.length; i++){
    
//                     var row 		= dataSet[i];
//                     var prightid 	= pPrefix + row.rightid;
//                     var pdesc 		= row.description;
    
//                     var valuesRow	= [uuid.v4(), pEntity, pAppId, prightid, pdesc];
    
//                     //console.log(valuesRow);
    
//                     rightsVals.push(valuesRow);
    
//                     //cgmy.getTableData(req, res, next, pQuery, function( error, rows ){});
    
//                     if(i == dataSet.length - 1) {
    
//                         //pQuery1 = 'insert into tblRights(juid,entityid,appid,rightid,description)values ?';
    
//                         ////console.log('---------->>> Add Rights no: ' + i + ' : ' + pQuery );
    
//                         //connection.query( pQuery1, [rightsVals], function(err, rows) {
    
//                         //	if (err) throw err;
    
//                             //console.log('THIS IS ROWS : ===========> ' + JSON.stringify(rows));
    
//                         //});
    
//                         for(var x = 0; x < dataSet.length; x++){
    
//                             var row 		= dataSet[x];
//                             var prightid 	= pPrefix + row.rightid;
//                             var pdesc 		= row.description;
    
//                             var valuesRow	= [uuid.v4(), pEntity, role, prightid, pdesc, pAppId];
    
//                             //console.log(valuesRow);
    
//                             rightsasgnVals.push(valuesRow);
    
//                             if(x == dataSet.length - 1) {
    
//                                 qQuery1 = 'insert into tblRightAsgn(juid,entityid,roleid,rightid,description,appid) values ?';
    
//                                 ////console.log('---------->>> Add Right Assignment no: ' + x + ' : ' + qQuery1 );
    
//                                 connection.query( qQuery1, [rightsasgnVals], function(err, rows) {
    
//                                     if (err) throw err;
//                                     connection.end();
    
//                                 });
    
//                                 //res.send( 'OK - The rights has been generated! generated rights in total of : ' + rightsasgnVals.length);
//                                 //res.send( 'OK - The rights has been generated!');
    
//                                 return callback('<p>OK - The rights for "'+ role +'" has been generated!</p>');
    
//                             }
//                         }
//                     }
//                 }
//             });
//         },
    
    
//         /**
//          * Added by JMD 07/13/2021
//          * This function generates a SQL script
//          * @summary Function that generates sql script
//          * @param table Table name of the script to be generated
//          * @param columns array of columns to be created.
//          * @author Jammi Dee <jammidee.gmail.com>
//          * @copyright Lalulla OPC 2012-2022
//          */
//         generateInsertSql:function (dbase, mycolumns){
//             var sqlString = require('sqlString');
    
//             var genquery = "insert into " + dbase + "( ";
    
//                 for (i in mycolumns) {
    
//                     //Test if last column
//                     var length = mycolumns.length - 1;
//                     length  = parseInt(length);
    
//                     var ivar = parseInt(i);
    
//                     if(ivar === length){
//                         genquery += mycolumns[i].column + " ";
    
    
//                     }else{
    
//                         genquery += mycolumns[i].column + ", ";
    
    
//                     }
    
//                 }
    
//                 genquery += ") values (";
    
//                 for (i in mycolumns) {
    
//                     //Test if string or integer
//                     if(mycolumns[i].type === "str"){
    
//                         genquery += "'" + mycolumns[i].value + "'";
    
//                     }else if(mycolumns[i].type === "stresc"){
    
//                         genquery += " " + sqlString.escape(mycolumns[i].value) + " ";
    
//                     }else if(mycolumns[i].type === "date"){
    
    
//                         genquery += "'" + app.convertDate(mycolumns[i].value) + "'";
    
//                     }else{
    
//                         genquery += " " + mycolumns[i].value + " ";
//                     }
    
//                     //Test if last column
//                     var length = mycolumns.length - 1;
//                     length  = parseInt(length);
    
//                     var ivar = parseInt(i);
    
//                     if(ivar === length){
    
//                         genquery += " ";
//                     }else{
//                         genquery += ", ";
//                     }
//                 }
    
//                 genquery += ");";
    
//                 return genquery;
//         },
    
//         // Generate an UPDATE sql script
//         // Added by JMD 07/13/2021
//         generateUpdateSql:function(dbase, mycolumns, wherecolumns){
//             var sqlString				= require('sqlString');
//             try {
//                 var genquery = "update " + dbase + " set ";
    
//                     for (i in mycolumns) {
    
//                         //Test if string or integer
//                         if(mycolumns[i].type === "str"){
    
//                             genquery += mycolumns[i].column +" = " +  "'" + mycolumns[i].value + "'";
    
//                         }else if(mycolumns[i].type === "stresc"){
    
//                             genquery += mycolumns[i].column +" = " +  " " + sqlString.escape(mycolumns[i].value) + " ";
    
//                         }else if(mycolumns[i].type === "date"){
    
//                             genquery += mycolumns[i].column +" = " +  "'" + app.convertDate(mycolumns[i].value) + "'";
    
//                         }else{
//                             genquery += mycolumns[i].column +" = " + " " + mycolumns[i].value + " ";
//                         }
    
//                         //Test if last column
//                         var length = mycolumns.length - 1;
//                         length  = parseInt(length);
    
//                         var ivar = parseInt(i);
//                         if(ivar === length){
    
//                             genquery +=  " ";
//                         }else{
    
//                             genquery += ", ";
    
//                         }
    
//                     }
    
//                     genquery += "where ";
    
//                     for (i in wherecolumns) {
    
//                         //Test if string or integer
//                         if(wherecolumns[i].type === "str"){
    
//                             genquery += wherecolumns[i].column +" = " +  "'" + wherecolumns[i].value + "'";
    
//                         }else if(wherecolumns[i].type === "stresc"){
//                             genquery += wherecolumns[i].column +" = " +  " " + sqlString.escape(wherecolumns[i].value) + " ";
    
//                         }else{
    
//                             genquery += wherecolumns[i].column +" = " + " " + wherecolumns[i].value + " ";
//                         }
    
//                         //Test if last column
//                         var length = wherecolumns.length - 1;
//                         length  = parseInt(length);
    
//                         var ivar = parseInt(i);
//                         if(ivar === length){
    
//                             genquery +=  " ";
//                         }else{
    
//                             genquery += ", ";
    
//                         }
//                     }
    
//                     genquery += ";";
    
//                     return genquery;
    
//             } catch (e) {
//                 console.error('ERROR IN genupdatesql: ' + e);
//             }
//         },
    
//         // Added by Jammi Dee - 07/13/2021
//         writeErrorMessage:function(req,rows,moduleid,process){
//             /* Required library for the Lalulla System */
//             var ch = require('./cglibhelper.js');
    
//             pEntity			= req.session.entityid;
//             pAppId			= req.session.cgAppId;
//             pUserId			= req.session.userid;
//             //pMsg			= 'Update to table tbllookup';
//             pModuleid		= moduleid;
//             pProcess		= process;
//             pScopeId		= 'SQLERROR';
//             pStype			= 'USER';
    
//             var errormessage = rows.sqlMessage;
//             var errormessage = errormessage.replace(/'/g, " ");
//             console.log(errormessage.error);
//             ch.writeAppLog(pUserId, errormessage, pModuleid, pAppId, pProcess, pScopeId, pStype, pEntity, function( error, result ){
    
//             });
//         },
    
    
//         // Added by Jammi Dee - 07/12/2021
//         debuglogs: function( logText ) {
    
//             var path    = require('path');
//             var nconf   = require('nconf');
//             nconf.use('file', { file: path.join(__dirname, './config.json') });
            
//             if(nconf.get('debugmode') === 'ON'){
//                 console.log( logText );
//             }
            
//         },
        
//         /**
//          * Added by JMD 09/02/2021
//          * This function generates a color from red to green
//          * @summary Function that generates color based on percentage.
//          * @param perc Percent that represents a color
//          * @author mlocati/color-scale.js
//          * @copyright Lalulla OPC 2012-2022
//          */
//         perc2color: function (perc) {
//             var r, g, b = 0;
//             if(perc < 50) {
//                 r = 255;
//                 g = Math.round(5.1 * perc);
//             }
//             else {
//                 g = 255;
//                 r = Math.round(510 - 5.10 * perc);
//             }
//             var h = r * 0x10000 + g * 0x100 + b * 0x1;
//             return '#' + ('000000' + h.toString(16)).slice(-6);
//         },
        
        
//         /**
//          * Added by JMD 09/07/2021
//          * This function generates a color from blue to green
//          * @summary Function that generates color based on percentage.
//          * @param perc Percent that represents a color
//          * @author mlocati/color-scale.js
//          * @copyright Lalulla OPC 2012-2022
//          */
//         perc2colorbg: function (perc) {
            
//             var Gradient = require("javascript-color-gradient");
//             //var colorGradient = require('javascript-color-gradient');
//             //import Gradient from "javascript-color-gradient";
//             const colorGrad = new Gradient();
            
//             const color1 = "#09a4b9";
//             const color2 = "#e9446a";
//             const color3 = "#edc988";
//             const color4 = "#178303";
            
//             colorGrad.setMidpoint(10);
//             colorGrad.setGradient(color1, color2, color3, color4);
//             var colo = colorGrad.getColor(  Math.ceil((perc/100) * 20)   );
            
//             return colo;
//         },
        
        
//         //============================================
//         // Added by Jammi Dee 08/26/2021
//         // Global library for color palette reference
//         //============================================
//         getColorBySetIndex: function (pset, index) {
        
//             var	j = [
//                 //Original
//                 'rgba(67, 134, 240, 0.9)',
//                 'rgba(121, 239, 61 , 0.9)',
//                 'rgba(239, 77, 61, 0.9)',
//                 'rgba(219, 231, 22, 0.9)',
//                 'rgba(245, 7, 238, 0.9)',
//                 'rgba(7, 245, 218 , 0.9)',
//                 'rgba(105,105,179, 0.9)',
//                 'rgba(83,58,123, 0.9)',
//                 'rgba(246, 136, 5, 0.9)',
//                 'rgba(238, 30, 169, 0.9)',
//                 'rgba(67, 134, 240, 0.9)',
//                 'rgba(121, 239, 61 , 0.9)',
//                 'rgba(239, 77, 61, 0.9)',
//                 'rgba(219, 231, 22, 0.9)',
//                 'rgba(245, 7, 238, 0.9)',
//                 'rgba(7, 245, 218 , 0.9)',
//                 'rgba(105,105,179, 0.9)',
//                 'rgba(83,58,123, 0.9)',
//                 'rgba(246, 136, 5, 0.9)',
//                 'rgba(238, 30, 169, 0.9)',
//                 'rgba(219, 231, 22, 0.9)',
//                 'rgba(245, 7, 238, 0.9)',
//                 'rgba(7, 245, 218 , 0.9)',
//                 'rgba(105,105,179, 0.9)',
//                 'rgba(83,58,123, 0.9)',
//                 'rgba(246, 136, 5, 0.9)',
//                 'rgba(238, 30, 169, 0.9)'
//             ];
        
//             var o = [
//                 //Trove
//                 'rgba(81,87,74,1)',
//                 'rgba(68,124,105,1)',
//                 'rgba(116,196,147,1)',
//                 'rgba(142,140,109,1)',
//                 'rgba(228,191,128,1)',
//                 'rgba(233,215,142,1)',
//                 'rgba(226,151,93,1)',
//                 'rgba(241,150,112,1)',
//                 'rgba(225,101,82,1)',
//                 'rgba(201,74,83,1)',
//                 'rgba(190,81,104,1)',
//                 'rgba(163,73,116,1)',
//                 'rgba(153,55,103,1)',
//                 'rgba(101,56,125,1)',
//                 'rgba(78,36,114,1)',
//                 'rgba(145,99,182,1)',
//                 'rgba(226,121,163,1)',
//                 'rgba(224,89,139,1)',
//                 'rgba(124,159,176,1)',
//                 'rgba(86,152,196,1)',
//                 'rgba(154,191,136,1)',
//                 'rgba(81,87,74,1)',
//                 'rgba(68,124,105,1)',
//                 'rgba(116,196,147,1)',
//                 'rgba(142,140,109,1)',
//                 'rgba(228,191,128,1)',
//                 'rgba(233,215,142,1)'
//                 ];
        
//             var e = [
//                 //Red-To-Gray
//                 'rgba(255,20,23,1)',
//                 'rgba(255,102,17,1)',
//                 'rgba(255,136,68,1)',
//                 'rgba(255,238,85,1)',
//                 'rgba(254,254,56,1)',
//                 'rgba(255,255,153,1)',
//                 'rgba(170,204,34,1)',
//                 'rgba(187,221,119,1)',
//                 'rgba(200,207,130,1)',
//                 'rgba(146,167,126,1)',
//                 'rgba(85,153,238,1)',
//                 'rgba(0,136,204,1)',
//                 'rgba(34,102,136,1)',
//                 'rgba(23,82,121,1)',
//                 'rgba(85,119,119,1)',
//                 'rgba(221,187,51,1)',
//                 'rgba(211,167,109,1)',
//                 'rgba(169,131,75,1)',
//                 'rgba(170,102,136,1)',
//                 'rgba(118,118,118,1)',
//                 'rgba(255,20,23,1)',
//                 'rgba(255,102,17,1)',
//                 'rgba(255,136,68,1)',
//                 'rgba(255,238,85,1)',
//                 'rgba(254,254,56,1)',
//                 'rgba(255,255,153,1)',
//                 'rgba(170,204,34,1)'
    
//                 ];
        
//             var l = [
//                 //Legend 16
//                 'rgba(25,129,0,1)',
//                 'rgba(77,195,44,1)',
//                 'rgba(190,244,61,1)',
//                 'rgba(56,126,115,1)',
//                 'rgba(51,193,153,1)',
//                 'rgba(135,255,157,1)',
//                 'rgba(36,105,186,1)',
//                 'rgba(117,207,250,1)',
//                 'rgba(189,93,253,1)',
//                 'rgba(137,27,176,1)',
//                 'rgba(241,99,145,1)',
//                 'rgba(254,173,192,1)',
//                 'rgba(198,40,28,1)',
//                 'rgba(249,90,0,1)',
//                 'rgba(255,158,50,1)',
//                 'rgba(255,224,122,1)',
//                 'rgba(25,129,0,1)',
//                 'rgba(77,195,44,1)',
//                 'rgba(190,244,61,1)',
//                 'rgba(56,126,115,1)',
//                 'rgba(51,193,153,1)',
//                 'rgba(135,255,157,1)',
//                 'rgba(36,105,186,1)',
//                 'rgba(117,207,250,1)',
//                 'rgba(189,93,253,1)',
//                 'rgba(137,27,176,1)',
//                 'rgba(241,99,145,1)'
    
//                 ];
        
        
//             var gr = [
//                 //Gradient Green
//                 'rgba(0,69,41,1)',
//                 'rgba(0,104,55,1)',
//                 'rgba(35,132,67,1)',
//                 'rgba(65,171,93,1)',
//                 'rgba(120,198,121,1)',
//                 'rgba(173,221,142,1)',
//                 'rgba(217,240,163,1)',
//                 'rgba(247,252,185,1)',
//                 'rgba(255,255,229,1)',
//                 'rgba(0,69,41,1)',
//                 'rgba(0,104,55,1)',
//                 'rgba(35,132,67,1)',
//                 'rgba(65,171,93,1)',
//                 'rgba(120,198,121,1)',
//                 'rgba(173,221,142,1)',
//                 'rgba(217,240,163,1)',
//                 'rgba(247,252,185,1)',
//                 'rgba(255,255,229,1)',
//                 'rgba(0,69,41,1)',
//                 'rgba(0,104,55,1)',
//                 'rgba(35,132,67,1)',
//                 'rgba(65,171,93,1)',
//                 'rgba(120,198,121,1)',
//                 'rgba(173,221,142,1)',
//                 'rgba(217,240,163,1)',
//                 'rgba(247,252,185,1)',
//                 'rgba(255,255,229,1)'
//                 ];
            
//             var bg = [
//                 //Gradient Blue - Green
//                 'rgba(34,157,206,1)',
//                 'rgba(55,167,182,1)',
//                 'rgba(99,192,138,1)',
//                 'rgba(142,215,94,1)',
//                 'rgba(165,227,72,1)',
//                 'rgba(202,201,208,1)',
//                 'rgba(34,157,206,1)',
//                 'rgba(55,167,182,1)',
//                 'rgba(99,192,138,1)',
//                 'rgba(142,215,94,1)',
//                 'rgba(165,227,72,1)',
//                 'rgba(202,201,208,1)',
//                 'rgba(34,157,206,1)',
//                 'rgba(55,167,182,1)',
//                 'rgba(99,192,138,1)',
//                 'rgba(142,215,94,1)',
//                 'rgba(165,227,72,1)',
//                 'rgba(202,201,208,1)',
//                 'rgba(34,157,206,1)',
//                 'rgba(55,167,182,1)',
//                 'rgba(99,192,138,1)',
//                 'rgba(142,215,94,1)',
//                 'rgba(165,227,72,1)',
//                 'rgba(202,201,208,1)'
//                 ];
            
        
        
//             if( pset == 'j' ){
        
//                 return j[index];
        
//             } else if( pset == 'o' ) {
                
//                 return o[index];
                
//             } else if( pset == 'e' ) {
                
//                 return e[index];
                
//             } else if( pset == 'l' ) {
                
//                 return l[index];
                
//             } else if( pset == 'gr' ) {
                
//                 return gr[index];
    
//             } else if( pset == 'bg' ) {
                
//                 return bg[index];
                
//             } else {
                
//                 return j[index];
                
//             }
        
            
        
//         } //getColorBySetIndex: function (pset, index)
        
        
        
//     };
    
       
    
    