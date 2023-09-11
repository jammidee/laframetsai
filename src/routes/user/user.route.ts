/**
 * Copyright (C) 2012-2017 Cloud Gate, Inc. All rights reserved.
 * Copyright (c) 2017 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of CloudGate System.
 * 
 * CloudGate Framework is distributed under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * CloudGate System is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
 * PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Cloud Gate System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 05/22/2018
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

// Define your user-related routes here
router.get('/', (req: Request, res: Response) => {
	
	res.render('user/user', { username: 'John' });
	//const filePath = path.join(__dirname, '../..', 'views', 'user', 'user.html');
	//res.sendFile(filePath);

});
export default router;