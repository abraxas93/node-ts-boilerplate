import winston, { format } from 'winston';

const colorizer = format.colorize();
const outputFormat = format.printf((info) => {
  const { timestamp, label, message, level } = info;
  return `${colorizer.colorize(level, timestamp)} ${colorizer.colorize(
    level,
    label
  )} ${colorizer.colorize(level, message)}`;
});

export function createLogger(file: string) {
  const parsed = file.split('/');
  const label = parsed.pop();
  return winston.createLogger({
    format: format.combine(
      format.label({ label: `[${label}]:` }),
      format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      outputFormat
    ),
    exitOnError: true,
    transports: [new winston.transports.Console()],
  });
}
