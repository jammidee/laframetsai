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
 * File Create Date: 09/26/2023 4:33pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Department } from "../models/department.model";
import { Lookup } from "../routes/lookup/model/lookup.model";

import * as dotenv from 'dotenv';
dotenv.config();

export const connection = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [
        User, Department, Lookup
    ]
})

async function connectionDB() {
    try {
        await connection.sync()
    } catch (error) {
        console.log(error)
    }
}

export default connectionDB