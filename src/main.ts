import 'dotenv/config';
import { Client, } from "discord.js";
import logger from "./utils/logger";

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMembers',
        'MessageContent'
    ]
});

client.on('ready', () => {
    logger.info('Client ready!');
})

client.login(process.env.TOKEN);
