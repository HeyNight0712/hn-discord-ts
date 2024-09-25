import 'dotenv/config';
import { Client, } from "discord.js";

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMembers',
        'MessageContent'
    ]
});

client.on('ready', c => {
    console.log(`Client ready!`);
})

client.login(process.env.TOKEN);
