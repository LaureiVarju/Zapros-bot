const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray
const findCharacterIndex = helpers.findCharacterIndex
const fs = require('fs');
const util = require('util')
const axios = require('axios')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addcharacter')
		.setDescription('Add a character to Zapros')
		.addStringOption(option => option.setName('character').setDescription('name of the character').setRequired(true))
		.addStringOption(option => option.setName('realm').setDescription('your realm name').setRequired(true)),

	async execute(interaction) {
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		let userdata = JSON.parse(rawdata) // must be let

		//these can probably be consts?
		let userid = interaction.user.id 
		let realm_name = interaction.options._hoistedOptions[1].value
		let character_name = interaction.options._hoistedOptions[0].value
		let api_character_call = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm_name}&name=${character_name}`

		async function checkCharacterStatusandSet() { // we need an async wrapper here to handle our API calls

			axios.get(api_character_call)
				.then((response) => {
					let thumbnail = response.data.thumbnail_url
					let api_char_name = response.data.name
					let api_class = response.data.class
					let api_realm = response.data.realm

					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`${api_char_name} Added!`)
						.setDescription(`Your ${api_class}, ${api_char_name}, has been added`)
						.setThumbnail(thumbnail)
						.addFields(
							{ name: `Set up ${api_char_name}'s key data:`, value: 'Try using /update' },
							{ name: 'Or add another character:', value: 'use /addcharacter' },
						)
						.setTimestamp()

					// If we enter this block the character and realm ARE valid
					// Here we're checking to see if the user already exists or not
					if (createUserIdArray(rawdata).includes(userid) == true) {

						// Now we're checking to see if this existing user's submitted character already exists in the database
						if (findCharacterIndex(userid, rawdata, character_name, realm_name) != -1) {
							return interaction.reply({ content: `You've already added ${api_char_name}! Try '/update' to update ${api_char_name}'s key data, or /delete to remove a character`, ephemeral: true })
						}
						// If we reach here the user already exists, but the character does not.
						// Meaning we append the existing character array only
						let new_char =
						{
							"character_name": api_char_name,
							"character_class": api_class,
							"key_period": 0,
							"weekly_key": '',
							"key_level": 0,
							"best_role": '',
							"second_best_role": '',
							"region": "Americas & Oceanic",
							"realm": api_realm
						}

						// we need to figure out where this user exists
						this_user = createUserIdArray(rawdata).indexOf(userid) // the location we need
					
						userdata.users[this_user].characters.push(new_char)
						// now save file
						const writeFile = util.promisify(fs.writeFile)
						userdata = JSON.stringify(userdata, null, 2);
						

						async function wrapper1(){
							await writeFile('../Zapros-bot/key_data.json',userdata )
						   }
						   wrapper1()

						return interaction.reply({ content: `Your character, ${character_name}-${realm_name} has been added! Try '/update' to update ${character_name}'s key data or '/addcharacter' to add another character`, embeds: [exampleEmbed], ephemeral: true })
					}

					//if we're here. we are adding a new user AND a new character
					let new_entry = {
						"id": 1,
						"discordid": userid,
						"characters":
							[
								{
									"character_name": api_char_name,
									"character_class": api_class,
									"key_period": 0,
									"weekly_key": '',
									"key_level": 0,
									"best_role": '',
									"second_best_role": '',
									"region": "Americas & Oceanic",
									"realm": api_realm
								}
							]
					}

					userdata.users.push(new_entry)
					// now save file
					const writeFile = util.promisify(fs.writeFile)
					userdata = JSON.stringify(userdata, null, 2);
					async function wrapper2(){
					 await writeFile('../Zapros-bot/key_data.json',userdata )
					}
					wrapper2()
							
					return interaction.reply({ content: `Your character, ${character_name}-${realm_name} has been added! Try '/update' to update ${character_name}'s key data or '/addcharacter' to add another character`, embeds: [exampleEmbed], ephemeral: true })
		
				})
				.catch(error => {
					console.warn('addCharacter call error')
					// This will return any raiderio API errors
					if (error.response != undefined) {
						return interaction.reply({ content: `${error.response.data.message}`, ephemeral: true })

					} else {
						// This will return ANY errors we get, including discordjs errors
						console.log(error)
						return interaction.reply({ content: 'Something went wrong! ' + error, ephemeral: true })
					}
				})
		} // end of the defined function
		await checkCharacterStatusandSet()
	} //end of the async exec block
};// end of the module