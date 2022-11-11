// const { SlashCommandBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mykeys')
		.setDescription('reports your keys only'),
	async execute(interaction) {
		// It's important to call on the data within the execute block so recent data changes are reflected without having to restart the bot
		const fs = require('fs');
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json'); // why am I doing this twice?
		const discordId = (element) => element == interaction.user.id;
		const moment = require('moment')

		//I can't remember why I'm calling in the same data in two different ways here
		async function getuserdata() {
			const rawdata2 = fs.readFileSync('../Zapros-bot/key_data.json');
			const userdata2 = JSON.parse(rawdata2);
			return userdata2
		}

		const axios = require('axios')
		const APIpaths = require('../APIpaths');
		const periodAPI = APIpaths.periodAPI
		const affixAPI = APIpaths.affixAPI
		const us_region = 0

		async function myKeys(user) {

			let character_array = []
			let out_of_date_characters = []
			let userdata = await getuserdata()
			let number_of_users = userdata.users.length
			if (createUserIdArray(rawdata).includes(interaction.user.id) == true) {

				let user_index = createUserIdArray(rawdata).findIndex(discordId)

				for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
					// console.log('value of y is ' + y)
					async function checkPeriodNumber() { // we need an async wrapper here to handle our API calls
						const res = await axios.get(periodAPI)
						const current_period = res.data.periods[us_region].current.period
						const last_recorded_character_key_period = userdata.users[user_index].characters[y].key_period
						const character_name = userdata.users[user_index].characters[y].character_name
						const weekly_key = userdata.users[user_index].characters[y].weekly_key
						const key_level = userdata.users[user_index].characters[y].key_level
						const realm = userdata.users[user_index].characters[y].realm
						const character_class = userdata.users[user_index].characters[y].character_class

						// only pick up key data that is recent. Out of date key data will be ignored
						if (current_period == last_recorded_character_key_period) {
							row_data = JSON.stringify(weekly_key + ' ' + '[' + key_level + ']' + ' ' + character_name + '-' + realm + ' ' + '(' + character_class + ')')
							cleaned_string = row_data.replace(/"/g, '')
							character_array.push(cleaned_string)
						} else {
							// console.log("Key for " + character_name + " is out of date: " + `${last_recorded_character_key_period} is ${(current_period - last_recorded_character_key_period)} week(s) behind current period ${current_period}`)
							out_of_date_characters.push(character_name + "-" + realm)
						}
					}
					await checkPeriodNumber() 

					// if we reach here, we're ready to post-process and return the array
					if (y == number_of_users - 1) {
						if (character_array.length == 0) {
							character_array.push(`I have no recent data for any of your characters, ${user}! Try '/update' to update your key(s) data`)
						}
					}
				}

				// wrapping the last of this in an async function to handle the API calls
				async function postProcessArray() {
					// Adding weekly date range
					if (character_array[0] != `I have no recent data for any of your characters, ${user}! Try '/update' to update your key(s) data`) {
						const week_dates_call = await axios.get(periodAPI)
						const beginning_date = moment(week_dates_call.data.periods[us_region].current.start).format('MMM Do')
						const ending_date = moment(week_dates_call.data.periods[us_region].current.end).format('MMM Do')
						character_array.unshift(`Your keys for the week of: ${beginning_date} - ${ending_date}`)

						//Adding weekly affixes
						const weekly_affixes = await axios.get(affixAPI)
						const affix_string = weekly_affixes.data.title
						character_array.push(`This week's affixes are: ${affix_string}`)
						if (out_of_date_characters.length > 0) {
							character_array.push('__You have ' + out_of_date_characters.length + ' character(s) with out of date key data. Use /update to enter any new key data__')
						}
					}
				}

				await postProcessArray() // must be called with await
				return character_array
			}

			else {
				const NOT_IN_DATABASE = `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`
				// console.log("no record for this user exists")
				let character_array = []
				character_array[0] = NOT_IN_DATABASE
				return character_array
			}
		}

		if (myKeys()[0] != `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`) {
			let final = await myKeys()  //'final' is technically an object, not an array, until the next line, which is why .join() has to happen later
			final = final.join('\n') //this .join() call has to be made here before applying it to the interaction, or we'll get an error.
			return interaction.reply({ content: final, ephemeral: true })
		}
		else {
			return interaction.reply({ content: `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true })
		}
	}
}