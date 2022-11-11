// const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, SelectMenuBuilder} = require('discord.js')
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const helpers = require('../helpers');
const createCharacterArrayForMenu = helpers.createCharacterArrayForMenu

let first_option =
{label: 'Delete all of my characters',
value: 'all of your characters'}

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription("Remove one or all of your characters"),
		
	async execute(interaction) {
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		let delete_options = createCharacterArrayForMenu(interaction.user.id, rawdata)
		delete_options.unshift(first_option)
	

		const delete_menu = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('delete-selection') // this id gets read at second_menu
					.setPlaceholder('Select the character you wish to delete')
					.addOptions(delete_options),
			);

		if (createCharacterArrayForMenu(interaction.user.id, rawdata)[0].label != 'NULL') {
			interaction.reply({ content: 'Select a character to delete', components: [delete_menu], ephemeral: true });
		}
		else {
			interaction.reply({ content: `I have no characters on file for you ${interaction.user.username}!`, ephemeral: true })
		}
	}
}