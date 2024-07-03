const { mkdirSync, createWriteStream, accessSync, constants: { F_OK } } = require("fs");
const path = require("path");

class Logger {
    constructor(options = {}) {
        const { dir = 'logs', prefix = 'app', ext = 'log', logLevel = 'debug' } = options;
        this.parentDir = dir;
        this.prefixName = prefix;
        this.extension = ext;
        this.logLevel = logLevel;
        this.levels = { error: 0, warn: 1, info: 2, debug: 3 };
        this.columnWidths = {
            timestamp: 24, 
            level: 8,
            message: 80 
        };

        this.init();
    }

    init() {
        try {
            if (!this.checkDirectoryExists(this.parentDir)) {
                mkdirSync(this.parentDir, { recursive: true });
                console.info(`Directory '${this.parentDir}' created successfully`);
            }
        } catch (err) {
            console.error(`Error creating directory '${this.parentDir}': ${err.message}`);
        }

        this.date = this.getCurrentDateString();
        this.fileName = this.getFilePath();
        this.writeHeader();
    }

    getCurrentDateString() {
        const now = new Date();
        return now.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(/:/g, '').concat('Z');
    }

    getFilePath() {
        return path.join(this.parentDir, `${this.prefixName}_${this.date}.${this.extension}`);
    }

    writeHeader() {
        const header = `${'Timestamp'.padEnd(this.columnWidths.timestamp)} ${'Level'.padEnd(this.columnWidths.level)} ${'Message'.padEnd(this.columnWidths.message)}`;
        this.appendLog(header);
    }

    writeLog(level, message) {
        const logMessage = this.formatMessage(level, message);
        this.appendLog(logMessage);
    }

    checkDirectoryExists(directory) {
        try {
            accessSync(directory, F_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    appendLog(message) {
        try {
            if (!this.writeStream) {
                this.writeStream = createWriteStream(this.fileName, { flags: 'a' });
            }
            this.writeStream.write(`${message}\n`);
        } catch (err) {
            console.error(`Error writing to file '${this.fileName}': ${err.message}`);
        }
    }

    formatMessage(level, message) {
        const timestamp = new Date().toISOString().padEnd(this.columnWidths.timestamp);
        const levelStr = level.toUpperCase().padEnd(this.columnWidths.level);
        return `${timestamp} ${levelStr} ${message.padEnd(this.columnWidths.message)}`;
    }

    log(level, ...args) {
        if (this.levels[level] <= this.levels[this.logLevel]) {
            const message = args.join(' ');
            const logMessage = this.formatMessage(level, message);

            const currentDate = this.getCurrentDateString();
            if (currentDate !== this.date) {
                if (this.writeStream) {
                    this.writeStream.close();
                    this.writeStream = null;
                }
                this.date = currentDate;
                this.fileName = this.getFilePath();
                this.writeHeader();
            }
            this.writeLog(level, message);
        }
    }

    error(...args) {
        this.log('error', ...args);
    }

    warn(...args) {
        this.log('warn', ...args);
    }

    info(...args) {
        this.log('info', ...args);
    }

    debug(...args) {
        this.log('debug', ...args);
    }
}

module.exports = Logger;
