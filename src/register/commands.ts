import {REST, Routes, SlashCommandBuilder} from 'discord.js'
import logger from "../utils/logger";
import config from "../utils/config";

export const registerCommands = async () => {
    const commands = [
        new SlashCommandBuilder()
            .setName("help")
            .setDescription("幫助指令")
            .toJSON()
    ];

    const rest = new REST({ version: '10'}).setToken(<string>config.TOKEN);

    try {
        logger.info("註冊指令...")

        await rest.put(
            Routes.applicationGuildCommands(
                <string>config.CLIENT_ID,
                <string>config.GUILD_ID
            ),
            {body: commands},
        )

        logger.info("註冊指令完畢")
    } catch (error) {
        logger.error(error);
    }
}