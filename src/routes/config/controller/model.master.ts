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
 * File Create Date: 04/19/2024 00:03am
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { RequestHandler } from "express";

export const get_model_master: RequestHandler = async (req, res) => {
    try {

        const modMaster = {
            model : process.env.AI_MASTER_MODEL,
            host: process.env.AI_MASTER_HOST,
            port: process.env.AI_MASTER_PORT
        };

        // Return data in JSON format
        return res.status(200).json( modMaster );

    } catch (error) {
        console.error("Error executing get model master query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const post_model_master: RequestHandler = async (req, res) => {
    try {

        const fs    = require('fs');
        const path  = require('path');

        // Get data from the form
        //const { model, host, port } = req.body;

        console.log(`${model} ${host} ${port} `);
        // Read the existing contents of the .env file
        let envContent = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');

        // Update only the relevant environment variables
        envContent = envContent.replace(/(AI_MASTER_MODEL=).*$/, `$1${model || 'llama2'}`);
        envContent = envContent.replace(/(AI_MASTER_HOST=).*$/, `$1${host || '127.0.0.1'}`);
        envContent = envContent.replace(/(AI_MASTER_PORT=).*$/, `$1${port || '11434'}`);

        // Write the modified content back to the .env file
        fs.writeFileSync(path.resolve(__dirname, '.env'), envContent);

        // Return data in JSON format
        return res.status(200).json( { message: 'Environment variables updated successfully' } );

    } catch (error) {
        console.error("Error executing post model master query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};