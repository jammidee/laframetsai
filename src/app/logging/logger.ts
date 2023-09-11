import { createLogger, transports, format } from 'winston';

// Define the logger configuration
const logger = createLogger({
  level: 'info', // Set the log level as needed (info, warn, error, etc.)
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/api.log' }) // Log to a file named 'api.log'
  ]
});

export default logger;