import { transports, createLogger, format } from 'winston';

const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  }),
);

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new transports.File({
            filename: 'logs/app.log',
            level: 'info',
          }),
        ]
      : []),
  ],
});

export default logger;
