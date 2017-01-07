const Winston = require('winston');

let logger = null;

if (process.env.NODE_ENV === 'test') {
  logger = new (Winston.Logger)({
    transports: [
      new (Winston.transports.File)({filename: 'test.log'})
    ]
  });
} else {
  logger = new Winston.Logger({
    transports: [
      new Winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      }),
      new Winston.transports.Http({
        level: 'info',
        handleExceptions: true,
        host: process.env.SAMMLER_LOG_SERVICE_URI,
        path: '/v1/logs',
        ssl: false
      })
    ],
    exitOnError: false
  });

}

logger.log = function () {
  const logArgs = arguments;
  // args[1] = args[1] + '\r\n';
  Winston.Logger.prototype.log.apply(this, logArgs);
};

module.exports = logger;
