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
 * File Create Date: 04/18/2024 11:53pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { Router } from "express";
import { authenticateToken } from '../../app/helpers/jwt-generate';

import { get_env_master, post_env_master } from "./controller/model.env";
import { get_config_all, get_config_database, get_config_embed, get_config_image, get_config_master, get_config_tooling, get_config_vector, post_config_database, post_config_embed, post_config_image, post_config_master, post_config_tooling, post_config_vector } from "./controller/model.config";

const ConfigRoutes = Router();

ConfigRoutes.get("/", (req, res) => {
  res.json({ message: "Config Route API" });
});

ConfigRoutes.get("/env/master",       authenticateToken,       get_env_master );              //JMD 04/18/2024
ConfigRoutes.post("/env/master",      authenticateToken,       post_env_master );             //JMD 04/18/2024

ConfigRoutes.get("/json/all",         authenticateToken,       get_config_all );              //JMD 04/20/2024

ConfigRoutes.get("/json/master",      authenticateToken,       get_config_master );           //JMD 04/20/2024
ConfigRoutes.post("/json/master",     authenticateToken,       post_config_master );          //JMD 04/20/2024
ConfigRoutes.get("/json/image",       authenticateToken,       get_config_image );            //JMD 04/20/2024
ConfigRoutes.post("/json/image",      authenticateToken,       post_config_image );           //JMD 04/20/2024
ConfigRoutes.get("/json/embed",       authenticateToken,       get_config_embed );            //JMD 04/20/2024
ConfigRoutes.post("/json/embed",      authenticateToken,       post_config_embed );           //JMD 04/20/2024
ConfigRoutes.get("/json/tooling",     authenticateToken,       get_config_tooling );          //JMD 04/20/2024
ConfigRoutes.post("/json/tooling",    authenticateToken,       post_config_tooling );         //JMD 04/20/2024

ConfigRoutes.get("/json/vector",      authenticateToken,       get_config_vector );           //JMD 04/20/2024
ConfigRoutes.post("/json/vector",     authenticateToken,       post_config_vector );          //JMD 04/20/2024
ConfigRoutes.get("/json/database",    authenticateToken,       get_config_database );         //JMD 04/20/2024
ConfigRoutes.post("/json/database",   authenticateToken,       post_config_database );        //JMD 04/20/2024

export default ConfigRoutes;