import 'dotenv/config';
import {Client,} from "discord.js";
import logger from "./utils/logger";
import config from "./utils/config";
import {registerCommands} from "./register/commands";

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMembers',
        'MessageContent'
    ]
});

client.on('ready', async () => {
    logger.info('機器人 準備好了');

    await registerCommands()
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!(interaction.commandName === 'help')) return;

    await interaction.reply({
        content: '無法幫助 QQ',
        ephemeral: true
    });

    logger.info('響應成功');
});

client.login(config.TOKEN);
