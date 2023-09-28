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
 * File Create Date: 09/28/2023 11:22am
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.janusAuthentication = exports.generateJWT = exports.authenticateToken = void 0;
const axios_1 = __importStar(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define a middleware function for JWT authentication
function authenticateToken(req, res, next) {
    let token = req.header("Authorization") || "";
    const secret = process.env.JWT_SECRET || "";
    token = token.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token.", err: err });
        }
        // Attach the user object to the request for use in other middleware or routes
        req["user"] = user;
        next(); // Continue to the next middleware or route
    });
}
exports.authenticateToken = authenticateToken;
function generateJWT() {
    try {
        // Generate a JWT token
        const secret = process.env.JWT_SECRET || "";
        return jsonwebtoken_1.default.sign({ username: process.env.BASIC_USERNAME }, secret, {
            expiresIn: process.env.TOKEN_EXPIRE || 60, // Token expiration time (adjust as needed)
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.generateJWT = generateJWT;
async function janusAuthentication(req, res, next) {
    let token = req.header("Authorization") || "";
    token = token.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    let config = {
        method: "post",
        url: `${process.env.JANUS_ENDPOINT}/api/v1/private/oauth/introspect-token`,
        headers: {
            Authorization: `Bearer ${process.env.JANUAS_API_TOKEN}`,
        },
        data: {
            token: token,
        },
    };
    try {
        const response = await (0, axios_1.default)(config);
        console.log(response.data);
        if (!response) {
            return res.status(403).json({ message: "Invalid token." });
        }
        if (!response.data.valid) {
            return res.status(403).json({ message: "Invalid token." });
        }
        console.log(req.originalUrl, req.path, "route");
        req.client_id = response.data.client_user_token.client_user.client_id;
        // check if client id is in req body or req query
        if (!req.query["client_id"] && !req.body["client_id"])
            return res.status(403).json({ message: "Client id is required" });
        if (req.query["client_id"] && req.query["client_id"] !== req.client_id) {
            return res.status(403).json({ message: "Invalid client id" });
        }
        if (req.body["client_id"] && req.body["client_id"] !== req.client_id) {
            return res.status(403).json({ message: "Invalid client id" });
        }
        next();
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError && error.response?.data?.status === 401) {
            return res.status(401).json({ message: "Unauthorized access token." });
            ;
        }
        console.log(error);
        throw error;
    }
}
exports.janusAuthentication = janusAuthentication;
