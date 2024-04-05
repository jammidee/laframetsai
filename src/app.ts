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
import cors from "cors";

import path from 'path';
//import logger from './app/logging/logger';
import logger from './app/logging/loggerotate';

import { sequelize } from './connection/sequelize';

// Setup the environment variables - JMD 09/11/2023
import * as dotenv from 'dotenv';
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

//=========
// Helpers
//=========
import connectionDB from './connection/connectiondb';
import initJSONVars from './app/helpers/initjsonvars';

(async () => {

	await connectionDB();		//JMD 09/30/2023
	await initJSONVars();		//JMD 09/28/2023

  })();



//===================
// Routes Entry Point
//===================
import SecurityRoutes from './routes/security/security.route';
import UserRoutes from './routes/user/user.route';
import LookupRoutes from './routes/lookup/lookup.route';


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
app.use('/api/v1/user', 			UserRoutes);
app.use('/api/v1/lookup', 			LookupRoutes); //10/05/2023

app.use('/user', 					UserRoutes);


app.use((req, res) => {
	res.status(404).json({ status: 404, message: "Invalid route!!!" });
  });

app.listen(globalPort, () => {
	console.log(`Server is running on port ${globalPort}`);
});

export default app;