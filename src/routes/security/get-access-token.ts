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
 * File Create Date: 09/28/2023 11:28am
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { RequestHandler } from "express";
import { generateJWT } from "../../app/helpers/jwt-generate";

export const accessToken: RequestHandler = async (req, res) => {

    // Extract Basic Auth credentials from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {

        return res.status(401).json({ message: "Invalid credentials." });
        
    }

    // Decode and split the Basic Auth credentials
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString( "utf-8" );
    const [username, password] = credentials.split(":");
    
    // Replace this with your actual user authentication logic (e.g., check a database)
    if (username === process.env.BASIC_USERNAME && password === process.env.BASIC_PASSWORD) {

        // Generate an access token (replace with your JWT or OAuth2 logic)
        const accessToken = generateJWT();

        // Respond with the access token
        return res.json({ access_token: accessToken });

    } else {

        return res.status(401).json({ message: "Invalid username or password." });

    }

};