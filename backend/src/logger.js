const winston = require('winston')
const path = require('path')

const options = {
	file: {
	  level: 'info',
	  filename: path.resolve('./logs.log'),
	  handleExceptions: true,
	  json: true,
	  maxsize: 5242880,
	  maxFiles: 5,
	  colorize: false,
	},
	console: {
	  level: 'debug',
	  handleExceptions: true,
	  json: false,
	  colorize: true,
	},
  };

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(options.console),
		new winston.transports.File(options.file),
	],
});

module.exports = logger
