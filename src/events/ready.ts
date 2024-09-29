import {EventHandler} from "../lib/EventHandler";
import logger from "../utils/logger";
import {registerCommands} from "../register/commands";
import config from "../utils/config";


const client_id = <string> config.CLIENT_ID;
const guild_id = <string> config.GUILD_ID;
const token = <string> config.TOKEN;

const ready: EventHandler = {
    eventName: "ready",



    async execute() {
        await registerCommands(client_id, guild_id, token);
        logger.info('機器人 準備好了');
    }
}

export const eventHandlers: EventHandler[] = [
    ready
]