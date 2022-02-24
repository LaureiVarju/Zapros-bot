
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length

function createCharacterArrayForMenu(userid) {
	console.log('value of userid ' + userid)
	console.log("inside createCharacterArrayForMenu()")
	const discordId = (element) => element == userid


	if (createUserArray().includes(userid) == true) {
		// if (createUserArray().includes(interaction.user.id) == true) {

		// console.log('you exist!')
		let user_index = createUserArray().findIndex(discordId)
		// console.log('index value is  ' + userid)

		//now make the key array for just this user
		let character_array = []



		for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
			// console.log('value of y is ' + y)

			const character_name = userdata.users[user_index].characters[y].character_name
			const realm = userdata.users[user_index].characters[y].realm
			const character_class = userdata.users[user_index].characters[y].character_class

			//   row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + userdata.users[user_index].characters[y].name + ' ' + userdata.users[user_index].characters[y].class)

			let row_data = {
				label: JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')').replace(/"/g, ''),
				name: JSON.stringify(character_name).replace(/"/g, ''),
				realm: JSON.stringify(realm).replace(/"/g, ''),
				value: JSON.stringify(character_name + '|' + realm).replace(/"/g, '') //this value property is redundant but we NEED it or the discordjs menu component won't work
			}
			// row_data = JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')')
			// cleaned_string = row_data.label.replace(/"/g, '')
			character_array.push(row_data)


			//if we reach this part of the loop, we're done
			if (y == userdata.users[user_index].characters.length - 1) {
				console.log("returning from createCharacterArrayforMenu")

				return character_array

			}
		}

		/// end of array logic

	} else {
		console.log("no record for this user exists")
		character_array = [{ label: 'no', description: 'nah', value: 'no' }]
		return character_array
		// const NOT_IN_DATABASE = `I have no record of you, [value ]! Use "/addcharacter" to create an entry!`

		// return NOT_IN_DATABASE
	}
}

//helper functions
function createUserArray() {
	console.log("inside CreateUserArray of")
	let user_array = []
	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		row_data = JSON.stringify(userdata.users[i].discordid)
		cleaned_string = row_data.replace(/"/g, '')


		user_array.push(cleaned_string)
		//if we reach this part of the loop, we're done
		if (i == number_of_users - 1) {
			// console.log("i == number of users - 1")
			// console.log(user_array)
			console.log("returning from CreateUserArray")
			return user_array
		}
	}
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('creates a menu'),

	async execute(interaction) {
		console.log("inside async execute block of menu.js")



		const character_menu_array = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('someid')
					// .setCustomId('characters')
					.setPlaceholder('None')
					.addOptions(createCharacterArrayForMenu(interaction.user.id))
			);


		console.log('length of createCharacterArrayForMenu() array is ' + createCharacterArrayForMenu(interaction.user.id).length)
		console.log('index 0.label for array is ' + createCharacterArrayForMenu(interaction.user.id)[0].label)
		if (createCharacterArrayForMenu(interaction.user.id)[0].label != 'no') {
			interaction.reply({ content: 'Select a character to update their key data!', components: [character_menu_array] });
		}
		else {
			// interaction.update({ content: 'no characters on file', components: [character_menu_array] });
			interaction.reply({ content: `I have no characters on file for you ${interaction.user.username}! Try using '/addcharacter' to get started! (inside menu.js)`, ephemeral: true })
		}
	}

}








// ORIGINAL MENU JS BELOW HERE

// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageActionRow, MessageSelectMenu } = require('discord.js');

// module.exports = {

// 	data: new SlashCommandBuilder()
// 		.setName('menu')
// 		.setDescription('select two options'),

// 	async execute(interaction) {
// 		console.log("inside async execute block of menu.js")

// 		if (interaction.customId === 'select') {
// 			console.log('select was picked')
// 		}
// 		await interaction.reply({ content: 'Pick something!', ephemeral: true, components: [row] });

// 	},
// };




// const row = new MessageActionRow()
// 	.addComponents(
// 		new MessageSelectMenu()
// 			.setCustomId('someid')
// 			.setPlaceholder('Select a dungeon')
// 			.addOptions([
// 				{
// 					label: 'DOS',
// 					description: 'De Other Side',
// 					value: 'DOS',
// 				},
// 				{
// 					label: 'HOA',
// 					description: 'Halls of Atonement',
// 					value: 'HOA',
// 				},
// 				{
// 					label: 'MISTS',
// 					description: 'Mists of Tirna Scithe',
// 					value: 'MISTS',
// 				},
// 				{
// 					label: 'NW',
// 					description: 'Necrotic Wake',
// 					value: 'NW',
// 				},
// 				{
// 					label: 'PF',
// 					description: 'Plaguefall',
// 					value: 'PF',
// 				},
// 				{
// 					label: 'SD',
// 					description: 'Sanguine Depths',
// 					value: 'SD',
// 				},
// 				{
// 					label: 'SOA',
// 					description: 'Spires of Ascension',
// 					value: 'SOA',
// 				},
// 				{
// 					label: 'TOP',
// 					description: 'Theater of Pain',
// 					value: 'TOP',
// 				},
// 			]),
// 	);
