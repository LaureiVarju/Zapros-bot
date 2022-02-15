const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
			const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('button'),
	async execute(interaction) {
		console.log(row)
		// await interaction.reply({ content: 'button!', ephemeral: true, embeds: [embed], components: [row.label] });
		await interaction.reply(interaction.row.);

	},
};


