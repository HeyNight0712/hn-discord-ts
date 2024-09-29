
import * as path from "node:path";
import * as fs from "node:fs";
import {Command} from "../lib/Command";
import {REST, Routes} from "discord.js";
import logger from "../utils/logger";

const commands: Command[] = [];

export async function registerCommands(clientId: string, guildId: string, token: string) {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = require(filePath);

        // 获取导出的 Command 对象
        const command: Command = commandModule[file.replace(/\.(ts|js)$/, '')] || commandModule.default;

        if (command && command.data) {
            commands.push(command);
        } else {
            logger.warning(`無法加載指令 ${file}`)
        }
    }

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        logger.info('開始刷新指令...');

        const commandData = commands.map(cmd => cmd.data.toJSON());

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandData },
        );

        logger.info('刷新完畢');
    } catch (error) {
        logger.error(error);
    }
}

export { commands };