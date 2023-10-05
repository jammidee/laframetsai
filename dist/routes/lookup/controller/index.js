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
 * along with Lalulla System.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 10/05/2023 06:55pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.modDelete = exports.modUpdate = exports.modRead = exports.modCreate = void 0;
const modCreate = async (req, res) => {
    return res.status(200).json({ status: 200, message: "Create!!!" });
};
exports.modCreate = modCreate;
const modRead = async (req, res) => {
    return res.status(200).json({ status: 200, message: "Read!!!" });
};
exports.modRead = modRead;
const modUpdate = async (req, res) => {
    return res.status(200).json({ status: 200, message: "Update!!!" });
};
exports.modUpdate = modUpdate;
const modDelete = async (req, res) => {
    return res.status(200).json({ status: 200, message: "Delete!!!" });
};
exports.modDelete = modDelete;
//# sourceMappingURL=index.js.map