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
 * File Create Date: 04/19/2024 07:41 pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { RequestHandler } from "express";
import {readServerConfig, writeServerConfig }  from "../config.json";

export const get_config_master: RequestHandler = async (req, res) => {
    try {

        const conf = await readServerConfig();

        const modMaster = {
            model : conf.ai.master.model,
            host: conf.ai.master.host,
            port: conf.ai.master.port
        };

        // Return data in JSON format
        return res.status(200).json( modMaster );

    } catch (error) {
        console.error("Error executing get model master query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const post_config_master: RequestHandler = async (req, res) => {
    try {

        const fs    = require('fs');
        const path  = require('path');

        // Get data from the form
        const { model, host, port } = req.body;

        let conf = await readServerConfig();
        conf.ai.master.model= model;
        conf.ai.master.host= host;
        conf.ai.master.port= port;

        await writeServerConfig( conf );

        // Return data in JSON format
        return res.status(200).json( { message: 'Config variables updated successfully' } );

    } catch (error) {
        console.error("Error executing post config master query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const get_config_image: RequestHandler = async (req, res) => {
    try {

        const conf = await readServerConfig();

        const modMaster = {
            model : conf.ai.image.model,
            host: conf.ai.image.host,
            port: conf.ai.image.port
        };

        // Return data in JSON format
        return res.status(200).json( modMaster );

    } catch (error) {
        console.error("Error executing get model image query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const post_config_image: RequestHandler = async (req, res) => {
    try {

        const fs    = require('fs');
        const path  = require('path');

        // Get data from the form
        const { model, host, port } = req.body;

        let conf = await readServerConfig();
        conf.ai.image.model= model;
        conf.ai.image.host= host;
        conf.ai.image.port= port;

        await writeServerConfig( conf );

        // Return data in JSON format
        return res.status(200).json( { message: 'Config image model variables updated successfully' } );

    } catch (error) {
        console.error("Error executing post config image query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const get_config_embed: RequestHandler = async (req, res) => {
    try {

        const conf = await readServerConfig();

        const modMaster = {
            model : conf.ai.embed.model,
            host: conf.ai.embed.host,
            port: conf.ai.embed.port
        };

        // Return data in JSON format
        return res.status(200).json( modMaster );

    } catch (error) {
        console.error("Error executing get model embed query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const post_config_embed: RequestHandler = async (req, res) => {
    try {

        const fs    = require('fs');
        const path  = require('path');

        // Get data from the form
        const { model, host, port } = req.body;

        let conf = await readServerConfig();
        conf.ai.embed.model= model;
        conf.ai.embed.host= host;
        conf.ai.embed.port= port;

        await writeServerConfig( conf );

        // Return data in JSON format
        return res.status(200).json( { message: 'Config embed model variables updated successfully' } );

    } catch (error) {
        console.error("Error executing post config embed query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const get_config_tooling: RequestHandler = async (req, res) => {
    try {

        const conf = await readServerConfig();

        const modMaster = {
            model : conf.ai.tooling.model,
            host: conf.ai.tooling.host,
            port: conf.ai.tooling.port
        };

        // Return data in JSON format
        return res.status(200).json( modMaster );

    } catch (error) {
        console.error("Error executing get model tooling query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const post_config_tooling: RequestHandler = async (req, res) => {
    try {

        const fs    = require('fs');
        const path  = require('path');

        // Get data from the form
        const { model, host, port } = req.body;

        let conf = await readServerConfig();
        conf.ai.tooling.model= model;
        conf.ai.tooling.host= host;
        conf.ai.tooling.port= port;

        await writeServerConfig( conf );

        // Return data in JSON format
        return res.status(200).json( { message: 'Config tooling model variables updated successfully' } );

    } catch (error) {
        console.error("Error executing post config tooling query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};