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
 * File Create Date: 04/05/2024 09:50pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { RequestHandler } from "express";
import mysql from "mysql2/promise";

export const dbquery: RequestHandler = async (req, res) => {
    try {
        const userscript: any = req.query.sqlscript;

        // Check if SQL script is provided
        if (!userscript) {
            return res.status(400).json({ error: "SQL script is required" });
        }

        // Decode userscript
        const psql = Buffer.from(userscript, 'base64').toString('utf-8');
        console.log("Decoded SQL script is: " + psql);

        // Connect to the database using environment variables
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'db_dev',
        });

        // Execute the SQL query
        const [rows, fields] = await connection.execute(psql);

        // Release the connection
        await connection.end();

        // Return data in JSON format
        return res.status(200).json({ rows });

    } catch (error) {
        console.error("Error executing database query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};