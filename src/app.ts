/**
 * Copyright (C) 2023 Lalulla, Inc. All rights reserved.
 * Copyright (c) 2023 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla System.
 * 
 * LaKuboTs Framework is distributed under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * LaKuboTs System is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
 * PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Lalulla System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 09/11/2023
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/


import express, { json, urlencoded } from 'express';
//import { createProxyMiddleware } from 'http-proxy-middleware';
//import cheerio from 'cheerio';
import cors 			from "cors";

import colors  			from 'colors/safe';
import path 			from 'path';
//import logger from './app/logging/logger';
import logger 			from './app/logging/loggerotate';

import ollama 			from './routes/llmapi/class/SimplyOllama';

// Setup the environment variables - JMD 09/11/2023
import * as dotenv 		from 'dotenv';
dotenv.config();

const app = express();

//=============
// Middlewares
//=============
app.use(cors());
app.use(urlencoded({ extended: false }))
app.use(json());
//app.use(express.static(path.join(__dirname, '../upload')));

//==================
// Global Variables
//==================
const globalPort = process.env.PORT || 3000;

//==================
// Framework Setup
//==================
// Set Pug as the view engine
app.set('view engine', 'pug');

// Specify the directory where your Pug templates are located
app.set('views', path.join(__dirname, 'views'));

//==================
// Global variables
//==================
var glovars: { // Define the type of glovars object
	token: string;
	macaddress: string;
	deviceid: string;
	driveserial: string;
	clientversion: number;
	latestclientversion: number;
	needupdate: number;
	currversion: string;
	currchanges: string;
	macid: string;
	username: string;
	entityid: string;
	appid: string;
	roleid: string;
	locked: string;
	allowlogon: string;
	models: Array<any>; // Explicitly define models as an array
  } = {
	token: "",
	macaddress: "",
	deviceid: "",
	driveserial: "",
	clientversion: 0,
	latestclientversion: 0,
	needupdate: 0,
	currversion: "",
	currchanges: "",
	macid: "",
	username: "sadmin",
	entityid: "LALULLA",
	appid: "RAG",
	roleid: "USER",
	locked: "YES",
	allowlogon: "NO",
	models: [] // Initialize models as an empty array
  };
  

//=========
// Helpers
//=========
import connectionDB from './connection/connectiondb';
import initJSONVars from './app/helpers/initjsonvars';

(async () => {

	await connectionDB();		//JMD 09/30/2023
	await initJSONVars();		//JMD 09/28/2023

})();

//=====================================================
// Server environment initialization and gathering of
// information.
//=====================================================

process.on( 'uncaughtException', function(err){
	console.log( 'UNCAUGHT EXCEPTION' );
	console.log( 'UNCAUGHT EXCEPTION' + err.stack || err.message );
});

//=============================================================
// Demo mode scripts. This will protect the app from executing 
// when the date had expired.
// Added by Jammi Dee 04/07/2019
//=============================================================

	//Expiration date of the demo app
	var xdate = new Date("2030-02-12");
	//The current date
	var cdate = new Date();

	if( cdate > xdate){
		//throw  new Error ('Time-bound access to the app error!');
		console.log('============================================================================');
		console.log('Time-bound access to the app has been reached!');
		console.log('The limit is ' + xdate );
		console.log('============================================================================');
		
		process.exit();
		
	}

//=============================================================

//===============================
// Check for ollama on this host
//===============================
(async () => {
    ollama.setBaseURL(`http://${process.env.AI_EXTRA_HOST}:${process.env.AI_EXTRA_PORT}` || 'http://127.0.0.1:11434');
    const response = await ollama.ping();
	if (response !== '') {
		console.log( colors.green("Ollama is up and running!") );
	} else {
		console.log( colors.red("Failed to connect to Ollama.") ); 
		process.exit();
	}
})();

//=================================
// Check for chromadb on this host
//=================================
(async () => {
    ollama.setBaseURL( `http://${process.env.VEC_EMBED_HOST}:${process.env.VEC_EMBED_PORT}` || 'http://127.0.0.1:8000' );
    const response = await ollama.pingchroma();
	if (response !== '') {
		console.log( colors.green("ChromaDB is up and running!") );
	} else {
		console.log( colors.red("Failed to connect to ChromaDB.") ); 
		process.exit();
	}
})();

async function populateModel( model:string, host:string, port:string){
    try {
      let searchModel = model;
      ollama.setBaseURL(`http://${host}:${port}`);
      const response = await ollama.tags();
      
      // Check if response has models
      if (response && response.models && Array.isArray(response.models)) {
        let modelFound = false;
        // Loop through each model
        response.models.forEach((model:any) => {

          const [modelName] = model.model.split(':');
            // Check if the model matches the searchModel
            if (modelName === searchModel) {
                //For Enterprise version only used these models
                glovars.models.push(model);
                modelFound = true;
            };

        });

        // Check if the searchModel was found
        if (modelFound) {
            console.log( colors.green(`Pre-defined model found: `) + colors.yellow(`${searchModel}`) );

        } else {
            console.log( colors.red(`Pre-defined model not found: `) + colors.red(`${searchModel}`));
			process.exit();
        }
      } else {
          console.error( colors.red(`No models found on http://${host}:${port}`));
          process.exit();
      };
    } catch (error) {
      console.error(colors.red(`Error occurred while fetching tags: ${error}`));
      process.exit();
    };

}; //function populateModel( model:string, host:string, port:string)


( async ()=>{

	//=============================================================
	// Check for the AI_MASTER_MODEL --> This is a required model.
	//=============================================================
	await populateModel( process.env.AI_MASTER_MODEL || '' , process.env.AI_MASTER_HOST || '' , process.env.AI_MASTER_PORT || '');

	//=============================================================
	// Check for the AI_IMAGE_MODEL --> This is a required model.
	//=============================================================
	await populateModel( process.env.AI_IMAGE_MODEL || '' , process.env.AI_IMAGE_HOST || '' , process.env.AI_IMAGE_PORT || '');

	//=============================================================
	// Check for the AI_EMBED_MODEL --> This is a required model.
	//=============================================================
	await populateModel( process.env.AI_EMBED_MODEL || '' , process.env.AI_EMBED_HOST || '' , process.env.AI_EMBED_PORT || '');

	//=============================================================
	// Check for the AI_TOOLING_MODEL --> This is a required model.
	//=============================================================
	await populateModel( process.env.AI_TOOLING_MODEL || '' , process.env.AI_TOOLING_HOST || '' , process.env.AI_TOOLING_PORT || '');


})();



//===================
// Routes Entry Point
//===================
import SecurityRoutes 			from './routes/security/security.route';
import DbAPIRoutes 				from './routes/dbapi/dbapi.route';					// JMD 04/05/2024
import LLMAPIRoutes 			from './routes/llmapi/llmapi.route';				// JMD 04/05/2024
import UserRoutes 				from './routes/user/user.route';
import LookupRoutes 			from './routes/lookup/lookup.route';

import ClientRoutes 			from '../src/routes/apps/client/client.route';		// JMD 04/12/2024


// Define your proxy route
//const targetUrl = 'http://lalulla.com'; // Replace with the target website URL

// // Use the proxy middleware for all requests
// app.use(createProxyMiddleware({
// 	target: targetUrl,
// 	changeOrigin: true,
// 	onProxyRes: (proxyRes, req, res) => {
// 	  if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
// 		// Intercept HTML responses and modify links
// 		const chunks: Buffer[] = [];
  
// 		proxyRes.on('data', (chunk: Buffer) => {
// 		  chunks.push(chunk);
// 		});
  
// 		proxyRes.on('end', () => {
// 		  const body = Buffer.concat(chunks).toString('utf-8');
// 		  const modifiedBody = modifyLinks(body, targetUrl, req.originalUrl);
  
// 		  // Set the modified content
// 		  if (!res.headersSent) {
// 			res.send(modifiedBody);
// 		  }
// 		});
// 	  } else {
// 		// For non-HTML responses, forward the response as-is
// 		if (!res.headersSent) {
// 		  proxyRes.pipe(res, { end: true });
// 		}
// 	  }
// 	},
// }));

// function modifyLinks(html: string, targetUrl: string, originalUrl: string): string {
// 	const $ = cheerio.load(html);

// 	// Modify all links in the document
// 	$('a').each((index, element) => {
// 		const href = $(element).attr('href');

// 		if (href) {
// 		// Check if the href points to the target destination
// 		if (href.startsWith(targetUrl) || href.startsWith('/')) {
// 			// Construct an absolute URL for the proxy
// 			const proxyUrl = new URL('/proxy', targetUrl);
			
// 			// Replace the href with the proxy URL
// 			proxyUrl.searchParams.set('url', href);
// 			proxyUrl.searchParams.set('originalUrl', originalUrl);
			
// 			$(element).attr('href', proxyUrl.toString());
// 		}
// 		}
// 	});

// 	return $.html();
// }

app.get('/', (req, res) => {
	res.send('Hello, Express with TypeScript!');
	logger.info(`API call to /api/resource`, { query: req.query });
});

//===================
// Route Usage Point
//===================
app.use('/api/v1/security', 		SecurityRoutes);

app.use('/api/v1/dbapi', 			DbAPIRoutes);		//04/05/2024
app.use('/api/v1/llmapi', 			LLMAPIRoutes);		//04/05/2024

app.use('/api/v1/user', 			UserRoutes);
app.use('/api/v1/lookup', 			LookupRoutes); 		//10/05/2023

app.use('/user', 					UserRoutes);

app.use('/client', 					ClientRoutes);		//04/12/2024


app.use((req, res) => {
	res.status(404).json({ status: 404, message: "Invalid route!!!" });
  });

app.listen(globalPort, () => {
	console.log(`Server is running on port ${globalPort}`);
});

/*
 * Main function that is being called
 * on a specific interval.
 * Added by Jammi Dee 04/05/2024
*/
//====================================
appService();
//====================================

/*===========================================================
 * This is the main function to be executed in this service.
 *===========================================================
*/
function appService() {
	
	const appServiceInterval = process.env.APP_SERVICE_INTERVAL || '10000';
	if (appServiceInterval) {
		setInterval(appWorker, parseInt(appServiceInterval));
	} else {
		// Handle the case when APP_SERVICE_INTERVAL is not defined
	}

};

function appWorker() {
	
	console.log( colors.green('Time ticks...') );
	
};

export default app;