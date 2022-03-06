const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mykeys')
		.setDescription('reports your keys only'),
	async execute(interaction) {

		let userid = interaction.user.id
		const fs = require('fs');
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		const userdata = JSON.parse(rawdata);
		const discordId = (element) => element == interaction.user.id;

		// myKeys functions as follows:
		// 1. Using a helper method, it creates an array of users
		// 2. It checks to see if the user exists in the database
		// 3. If the user does exist, it generates a new array of just their key data
		function myKeys() {
			if (createUserIdArray(rawdata).includes(interaction.user.id) == true) {
				console.log('you exist!')
				let user_index = createUserIdArray(rawdata).findIndex(discordId)
				console.log('index value is  ' + userid)

				//now make the key array for just this user
				let character_array = []
				for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
								
					row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + '[' + userdata.users[user_index].characters[y].key_level + ']' + ' ' + userdata.users[user_index].characters[y].character_name + '-' + userdata.users[user_index].characters[y].realm + ' ' + '(' + userdata.users[user_index].characters[y].character_class + ')')
					cleaned_string = row_data.replace(/"/g, '')
					character_array.push(cleaned_string)

					//if we reach this part of the loop, we're done
					if (y == userdata.users[user_index].characters.length - 1) {
						return character_array
					}
				}

			} else {
				const NOT_IN_DATABASE = `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`
				console.log("no record for this user exists")
				let character_array = []
				character_array[0] = NOT_IN_DATABASE
				return character_array
			}
		}
	
		if (myKeys()[0] != `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!` ){
		return interaction.reply({content: myKeys().join('\n') ,ephemeral: true})
		} else return interaction.reply({content: `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true})

	}
};





