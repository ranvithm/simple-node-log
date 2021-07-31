const Logger = require("../logger")

var logger = new Logger('logs', 'infoxd_', 'txt', ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"])
logger.log('row1    ', "row1    ", 'row1    ', 'row1    ', 'row1    ')