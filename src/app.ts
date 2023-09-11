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


import express from 'express';
import path from 'path';
//import logger from './app/logging/logger';
import logger from './app/logging/loggerotate';

// Setup the environment variables - JMD 09/11/2023
import * as dotenv from 'dotenv';
dotenv.config();

//==================
// Global Variables
//==================
const globalPort = process.env.PORT || 3000;

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
// Specify the directory where your Pug templates are located
//app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));

//===================
// Routes Entry Point
//===================
import userRoutes from './routes/user/user.route';


//===================
// Route Usage Point
//===================
app.use('/user', userRoutes);


app.get('/', (req, res) => {
	res.send('Hello, Express with TypeScript!');
	logger.info('API call to /api/resource', { query: req.query });
});

app.listen(globalPort, () => {
	console.log('Server is running on port 3000');
});