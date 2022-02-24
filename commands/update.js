
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length

function createCharacterArrayForMenu(userid) {
	console.log('value of userid ' + userid)
	// console.log("inside createCharacterArrayForMenu()")
	const discordId = (element) => element == userid

	if (createUserIdArray().includes(userid) == true) {

		let user_index = createUserIdArray().findIndex(discordId)
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

// Helper function that creates an array of all user ids ie: ["225812069704925184", "222059182445035522"]
// createCharacterArrayForMenu() uses the return value of createUserIdArray() to determine if the user exists in the JSON file, and if so, where
function createUserIdArray() {
	// console.log("inside CreateUserArray of")
	let user_array = []
	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		row_data = JSON.stringify(userdata.users[i].discordid)
		cleaned_string = row_data.replace(/"/g, '')
		user_array.push(cleaned_string)
		//if we reach this part of the loop, we're done
		if (i == number_of_users - 1) {
			// console.log("returning from CreateUserArray")
			return user_array
		}
	}
}

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
					.addOptions(createCharacterArrayForMenu(interaction.user.id))
			);



		if (createCharacterArrayForMenu(interaction.user.id)[0].label != 'NULL') {
			interaction.reply({ content: 'Select a character to update their key data!', components: [character_menu], ephemeral: true });
		}
		else {
			interaction.reply({ content: `I have no characters on file for you ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true })
		}
	}
}