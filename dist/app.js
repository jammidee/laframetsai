"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
//import logger from './app/logging/logger';
const loggerotate_1 = __importDefault(require("./app/logging/loggerotate"));
// Setup the environment variables - JMD 09/11/2023
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
//=============
// Middlewares
//=============
app.use((0, cors_1.default)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, express_1.json)());
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
app.set('views', path_1.default.join(__dirname, 'views'));
//=========
// Helpers
//=========
const initjsonvars_1 = __importDefault(require("./app/helpers/initjsonvars"));
(async () => {
    await (0, initjsonvars_1.default)();
})();
//===================
// Routes Entry Point
//===================
const security_route_1 = __importDefault(require("./routes/security/security.route"));
const user_route_1 = __importDefault(require("./routes/user/user.route"));
//===================
// Route Usage Point
//===================
app.use('/api/v1/security', security_route_1.default);
app.use('/user', user_route_1.default);
app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Invalid route!" });
});
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
    loggerotate_1.default.info(`API call to /api/resource`, { query: req.query });
});
app.listen(globalPort, () => {
    console.log(`Server is running on port ${globalPort}`);
});
exports.default = app;
