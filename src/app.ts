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
 * along with Cloud Gate System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 09/11/2023
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/


import express, { json, urlencoded } from 'express';
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
import initJSONVars from './app/helpers/initjsonvars';
(async () => {

	await initJSONVars();

  })();



//===================
// Routes Entry Point
//===================
import SecurityRoutes from './routes/security/security.route';
import userRoutes from './routes/user/user.route';




//===================
// Route Usage Point
//===================
app.use('/api/v1/security', SecurityRoutes);


app.use('/user', userRoutes);


app.use((req, res) => {
	res.status(404).json({ status: 404, message: "Invalid route!" });
  });

app.get('/', (req, res) => {
	res.send('Hello, Express with TypeScript!');
	logger.info(`API call to /api/resource`, { query: req.query });
});

app.listen(globalPort, () => {
	console.log(`Server is running on port ${globalPort}`);
});

export default app;