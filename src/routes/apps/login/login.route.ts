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
 * File Create Date: 04/13/2024 11:57pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/


import { Router, Request, Response } from 'express';
import path from 'path';

const LoginRoutes = Router();

//=======
// CRUDS
//=======
LoginRoutes.use("/", (req: Request, res: Response, next) => {
	
    // You can perform common tasks for all HTTP methods here
    console.log('Request received for /login');

    // Pass control to the next middleware or route handler
    next();
    
});

// Define your user-related routes here
LoginRoutes.get('/', (req: Request, res: Response) => {
	
	res.render('apps/login', { username: 'John' });
	//const filePath = path.join(__dirname, '../..', 'views', 'user', 'user.html');
	//res.sendFile(filePath);

});

export default LoginRoutes;