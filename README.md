# Simple Node Log

[![NPM](https://img.shields.io/npm/v/simple-node-log.svg)](https://www.npmjs.com/package/simple-node-log)

Simple Node Log is a Node.js logging module that provides easy-to-use functionalities for logging messages with timestamps and different log levels.

## Features

- `Timestamps`: Every log message includes a timestamp for easy tracking.
- `Log Levels`: Supports different log levels (error, warn, info, debug) to control the verbosity of logging.
- `File Logging`: Logs can be written to files in a specified directory.
- `Customizable`: Configure log directory, filename prefix, and log header.

## Installation

```bash
npm install --save simple-node-log
```

## Usage

```js
const Logger = require("simple-node-log");

// Initialize logger with options
const logger = new Logger({
  dir: "logs", // Log directory
  prefix: "app", // Log filename prefix
  ext: "log", // Log filename extension
  logLevel: "debug", // Log level (error, warn, info, debug)
});

// Log messages
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");
```

## Constructor Options

- `dir`: Directory where log files will be stored. Default is 'logs'.
- `prefix`: Prefix for log file names. Default is 'app'.
- `ext`: Extension for log file names. Default is 'log'.
- `header`: Optional header for the log file. Default is ''.
- `logLevel`: Log level ('error', 'warn', 'info', 'debug'). Default is 'info'.

## Logging Methods

- `logger.error(...)`: Log an error message.
- `logger.warn(...)`: Log a warning message.
- `logger.info(...)`: Log an info message.
- `logger.debug(...)`: Log a debug message.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
