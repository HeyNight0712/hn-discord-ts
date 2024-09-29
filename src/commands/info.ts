import {Command} from "../lib/Command";
import {SlashCommandBuilder} from "discord.js";

export const info: Command = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("查詢成員")
        .addUserOption(option => option
            .setName("target")
            .setDescription("查詢成員")
            .setRequired(false)
        ),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user;

        await interaction.reply({
            content: `你查询的成员是: ${targetUser.globalName || targetUser.username}`,
            ephemeral: true,
        });
    }
}