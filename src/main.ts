import 'dotenv/config';
import {Client,} from "discord.js";
import config from "./utils/config";
import {registerEvents} from "./register/events";

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMembers',
        'MessageContent'
    ]
});

registerEvents(client);

client.login(config.TOKEN);
