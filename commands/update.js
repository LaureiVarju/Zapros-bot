const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
// const userdata = JSON.parse(rawdata);
// const number_of_users = userdata.users.length

const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray
const createCharacterArrayForMenu = helpers.createCharacterArrayForMenu


module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription("Update your character's key data"),
		
	async execute(interaction) {
		console.log("inside async execute block of menu.js")

		const character_menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('characterSelected')
					.setPlaceholder('Select Your Character')
					.addOptions(createCharacterArrayForMenu(interaction.user.id, rawdata)),
			);



		if (createCharacterArrayForMenu(interaction.user.id, rawdata)[0].label != 'NULL') {
			interaction.reply({ content: 'Select a character to update their key data!', components: [character_menu], ephemeral: true });
		}
		else {
			interaction.reply({ content: `I have no characters on file for you ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true })
		}
	}
}