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
 * File Create Date: 09/11/2023
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';

import * as dotenv from 'dotenv';
dotenv.config();

// Import the DailyRotateFile transport using require syntax
const DailyRotateFile = require('winston-daily-rotate-file');

// Create the log directory if it doesn't exist
const logDir = process.env.LOG_DIR || '../../logs' ;
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define the logger configuration
const logger = createLogger({
  level: 'info', // Set the log level as needed (info, warn, error, etc.)
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new DailyRotateFile({
      dirname: path.join(__dirname, logDir),
      filename: 'api-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m', // Change the max size as needed
      maxFiles: '14d', // Keep logs for 14 days (adjust as needed)
    }),
  ],
});

export default logger;
