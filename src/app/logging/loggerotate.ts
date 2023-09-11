import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';

// Import the DailyRotateFile transport using require syntax
const DailyRotateFile = require('winston-daily-rotate-file');

// Create the log directory if it doesn't exist
const logDir = '../../logs'; // You can change this directory path if needed
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
