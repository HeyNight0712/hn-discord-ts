import {Client} from "discord.js";
import * as path from "node:path";
import * as fs from "node:fs";
import {EventHandler} from "../lib/EventHandler";
import logger from "../utils/logger";


export function registerEvents(client: Client) {
    const handlersPath = path.join(__dirname, '..', 'events');
    logger.info(`加載 路徑: ${handlersPath}`)

    const eventFiles = fs
        .readdirSync(handlersPath)
        .filter((file) => (file.endsWith('.ts') || file.endsWith('.js')) && file !== 'EventHandler.ts');

    for (const file of eventFiles) {
        const filePath = path.join(handlersPath, file);
        const eventModule = require(filePath);

        if (eventModule.eventHandlers && Array.isArray(eventModule.eventHandlers)) {
            const handlers: EventHandler[] = eventModule.eventHandlers;

            for (const handler of handlers) {
                if (handler.once) {
                    client.once(handler.eventName, (...args) => handler.execute(...args));
                } else {
                    client.on(handler.eventName, (...args) => handler.execute(...args));
                }
                logger.info(`已注册事件：${handler.eventName}`);
            }
        } else {
            logger.error(`${file} 未導出 eventHandlers`);
        }
    }
}