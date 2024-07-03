const Logger = require('simple-node-log');

// Initialize logger with options
const logger = new Logger({
    dir: 'logs',        // Log directory
    prefix: 'app',      // Log filename prefix
    ext: 'log',         // Log filename extension
    logLevel: 'debug'   // Log level (error, warn, info, debug)
});

// Log messages
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.debug('This is a debug message');