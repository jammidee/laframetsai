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
 * File Create Date: 09/28/2023 12:06pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { Router } from "express";
import { accessToken, userToken } from "./controller/get-access-token";
import { validateToken } from "./controller/validate-token";
import { authenticateToken } from "../../app/helpers/jwt-generate";

const SecurityRoutes = Router();

SecurityRoutes.get("/", (req, res) => {
  res.json({ message: "Security Route API" });
});

SecurityRoutes.use("/getaccesstoken", accessToken );                            //JMD 09/28/2023
SecurityRoutes.use("/getusertoken", userToken );                                //JMD 09/30/2023

SecurityRoutes.get("/validatetoken", authenticateToken, validateToken  );       //JMD 09/28/2023



export default SecurityRoutes;