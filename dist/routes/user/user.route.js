"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define your user-related routes here
router.get('/', (req, res) => {
    res.render('user/user', { username: 'John' });
    //const filePath = path.join(__dirname, '../..', 'views', 'user', 'user.html');
    //res.sendFile(filePath);
});
exports.default = router;
