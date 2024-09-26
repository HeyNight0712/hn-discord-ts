import { createLogger, format, transports } from "winston";
import { inspect } from 'util';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    const formattedMessage = typeof message === 'object'
        ? inspect(message, { depth: null, colors: true })
        : message;

    return `${timestamp} [${level}]: ${formattedMessage}`;
});

const logger = createLogger({
    level: 'info', // 日誌級別
    format: combine(
        colorize(), // 日誌級別顏色
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        // 輸出
        new transports.Console()
    ]
});

export default logger;