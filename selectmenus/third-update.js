// maybe turn this into an entry for something manually written


const presets = require('../presets');
const key_level_menu = presets.key_level_menu

const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js'); 

const key_level_numbers = new ActionRowBuilder()
	.addComponents(
		new SelectMenuBuilder()
			.setCustomId('key-level')
			.setPlaceholder('Select a level for your key')
			.addOptions(key_level_menu)
	);

module.exports = {

	customId: "key-name",

	async execute(interaction) {

		let realm = interaction.message.content.split('-')[1].trim()
		let charname = interaction.message.content.split(':')[1].split('-')[0].trim()
		let key_type = interaction.values[0]

		await interaction.update({ content: `Choose a level for your [${key_type}] key for (${charname}-${realm}) `, ephemeral: true, components: [key_level_numbers] });

	},


};

