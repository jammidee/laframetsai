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
 * File Create Date: 04/05/2024 10:59pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { Router } from "express";
import { authenticateToken } from '../../app/helpers/jwt-generate';

import { ollamaCheck } from "./controller/ollama-check";

const LlmApiRoutes = Router();

LlmApiRoutes.get("/", (req, res) => {
  res.json({ message: "LLM Route API" });
});

// Check if ollama is installed in the server 04/05/2024
LlmApiRoutes.get("/ollamacheck", authenticateToken, ollamaCheck );              //JMD 04/05/2024

export default LlmApiRoutes;