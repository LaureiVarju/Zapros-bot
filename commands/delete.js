const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length

const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray

//may need to be refactored. this needs the number of users, and the data, 

function createCharacterArrayForMenu(userid) {
	console.log('value of userid ' + userid)
	// console.log("inside createCharacterArrayForMenu()")
	const discordId = (element) => element == userid

	if (createUserIdArray(number_of_users, userdata, userid).includes(userid) == true) {

		let user_index = createUserIdArray(number_of_users, userdata, userid).findIndex(discordId)
		let character_array = []

		for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
			// console.log('value of y is ' + y)
			const character_name = userdata.users[user_index].characters[y].character_name
			const realm = userdata.users[user_index].characters[y].realm
			const character_class = userdata.users[user_index].characters[y].character_class

			let row_data = {
				label: JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')').replace(/"/g, ''),
				// this value property is somewhat redundant but we NEED it or the discordjs menu component won't work. It also HAS to be a string
				value: JSON.stringify(character_name + '-' + realm).replace(/"/g, '')
			}

			character_array.push(row_data)

			//if we reach this part of the loop, we're done
			if (y == userdata.users[user_index].characters.length - 1) {
				return character_array
			}
		}
		/// end of array logic

	} else {
		console.log("no record for this user exists")
		character_array = [{ label: 'NULL', value: 'NULL' }]
		return character_array
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription("Remove one or all of your characters"),
		
	async execute(interaction) {
		console.log("inside async execute block of menu.js")

		const character_menu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('characterSelected-del')
					.setPlaceholder('Select Your Character')
					.addOptions(createCharacterArrayForMenu(interaction.user.id)),
			);



		if (createCharacterArrayForMenu(interaction.user.id)[0].label != 'NULL') {
			interaction.reply({ content: 'Select a character to update their key data!', components: [character_menu], ephemeral: true });
		}
		else {
			interaction.reply({ content: `I have no characters on file for you ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true })
		}
	}
}