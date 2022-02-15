const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('mykeys')
		.setDescription('reports your keys only'),
	async execute(interaction) {

		let userid = interaction.user.id

		const fs = require('fs');
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		const userdata = JSON.parse(rawdata);
		const number_of_users = userdata.users.length
		const discordId = (element) => element == interaction.user.id;



		// myKeys functions as follows:
		// 1. Using a helper method, it creates an array of users
		// 2. It checks to see if the user exists in the database
		// 3. If the user does exist, it generates a new array of just their key data


		function myKeys() {
			if (createUserArray().includes(interaction.user.id) == true) {
				console.log('you exist!')
				let user_index = createUserArray().findIndex(discordId)
				console.log('index value is  ' + userid)

				//now make the key array for just this user
				let character_array = []



				for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
					console.log('value of y is ' + y)

					//   row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + userdata.users[user_index].characters[y].name + ' ' + userdata.users[user_index].characters[y].class)
					row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + '[' + userdata.users[user_index].characters[y].key_level + ']' + ' ' + userdata.users[user_index].characters[y].character_name + '-' + userdata.users[user_index].characters[y].realm + ' ' + '(' + userdata.users[user_index].characters[y].character_class + ')')
					cleaned_string = row_data.replace(/"/g, '')
					character_array.push(cleaned_string)


					//if we reach this part of the loop, we're done
					if (y == userdata.users[user_index].characters.length - 1) {

						return character_array

					}
				}

				/// end of array logic

			} else {
				const NOT_IN_DATABASE = `I have no record of you, ${interaction.user.username}! Say "!update" to create an entry`
				console.log("no record for this user exists")
				return NOT_IN_DATABASE
			}
		}

		//helper functions
		function createUserArray() {
			let user_array = []
			//outer loop i is set by our overall user level
			for (let i = 0; i < number_of_users; i++) {
				row_data = JSON.stringify(userdata.users[i].discordid)
				cleaned_string = row_data.replace(/"/g, '')


				user_array.push(cleaned_string)
				//if we reach this part of the loop, we're done
				if (i == number_of_users - 1) {
					console.log("i == number of users - 1")
					console.log(user_array)
					return user_array
				}
			}
		}



		return interaction.reply(myKeys().join('\n'))

	}
};





