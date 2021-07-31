# simple-node-log

> 

[![NPM](https://img.shields.io/npm/v/simple-node-log.svg)](https://www.npmjs.com/package/simple-node-log)

## Installation

```bash
npm install --save simple-node-log
```

## Usage  Logger

```js
const Logger = require("simple-node-log")

var logger = new Logger('logs', 'infoxd_', 'txt', ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"])
logger.log('row1    ', "row1    ", 'row1    ', 'row1    ', 'row1    ')
```

## License

MIT © [Ranjithkumar M](https://github.com/ravithM)
