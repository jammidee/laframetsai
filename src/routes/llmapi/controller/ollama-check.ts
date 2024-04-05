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
 * File Create Date: 04/05/2024 11:09pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

require('dotenv').config();
import axios                from 'axios';
import { RequestHandler }   from "express";

import ollama from './SimplyOllama';

export const ollamaCheck: RequestHandler = async (req, res) => {

    const baseurl = req.query.baseurl as string;

    if (baseurl !== '' && baseurl !== undefined) {
        const parsedUrl = new URL(baseurl);
        if (parsedUrl.hostname !== 'localhost') {
            ollama.setBaseURL(baseurl);
        }
    }

    try {

        const response = await ollama.ping();
        if (response !== '') {
            return res.status(200).json({ message: "Ollama is up and running!" });
        } else {
            return res.status(500).json({ message: "Failed to connect to Ollama." }); 
        }

    } catch (error) {

        console.error('Error:', error);
        return res.status(500).json({ message: "Failed to connect to Ollama." });

    }
};