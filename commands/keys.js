const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('keys')
		.setDescription('Reports all keys'),
	// populate an array based on JSON data, and spit back the array to the user
	async execute(interaction) {
		let results = await reportAllKeys() //returns an object
		const array_results = Object.values(results); //turns the object into an array so I can call .join() on the results for better formatting
		return interaction.reply({ content: array_results.join('\n'), ephemeral: true })
	}
};

const moment = require('moment')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length
const axios = require('axios')
const presets = require('../APIpaths');
const periodAPI = presets.periodAPI
const affixAPI = presets.affixAPI
const us_region = 0


async function reportAllKeys() {

	let character_array = []

	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		// y is the amount of characters a user has
		// This next loop populates all of the characters for the i user before incrementing i

		// y has to be intialized here and incremented
		for (let y = 0; y < userdata.users[i].characters.length; y++) {
			// console.log('value of y is ' + y)
			async function getPeriodNumber() { // we need an async wrapper here to handle our API calls
				const res = await axios.get(periodAPI)
				const current_period = res.data.periods[us_region].current.period
				const last_recorded_character_key_period = userdata.users[i].characters[y].key_period
				const character_name = userdata.users[i].characters[y].character_name
				const weekly_key = userdata.users[i].characters[y].weekly_key
				const key_level = userdata.users[i].characters[y].key_level
				const realm = userdata.users[i].characters[y].realm
				const character_class = userdata.users[i].characters[y].character_class

				// only pick up key data that is recent. Out of date key data will be ignored
				if (current_period != last_recorded_character_key_period) {
					console.log("Key for " + character_name + " is out of date: " + `${last_recorded_character_key_period} is ${(current_period - last_recorded_character_key_period)} week(s) behind current period ${current_period}`)
				}
				if (current_period == last_recorded_character_key_period) {

					row_data = JSON.stringify(weekly_key + ' ' + '[' + key_level + ']' + ' ' + character_name + '-' + realm + ' ' + '(' + character_class + ')')
					cleaned_string = row_data.replace(/"/g, '')
					character_array.push(cleaned_string)
				}

			}
			await getPeriodNumber() // if we don't call this with await, then we get some weird behavior
		}


		// if we reach here, we're ready to post-process and return the array
		if (i == number_of_users - 1) {
			// console.log("i == number of users - 1")
			if (character_array.length == 0) {
				character_array.push("I have no key data this week! Use /update to enter this week's keys")
			}

			// wrapping the last of this in an async function to handle the API calls
			async function postProcessArray() {
				// Adding weekly date range
				const week_dates_call = await axios.get(periodAPI)
				const beginning_date = moment(week_dates_call.data.periods[us_region].current.start).format('MMM Do')
				const ending_date = moment(week_dates_call.data.periods[us_region].current.end).format('MMM Do')
				character_array.unshift(`Keys for the week of: ${beginning_date} - ${ending_date}`)

				//Adding weekly affixes
				const weekly_affixes = await axios.get(affixAPI)
				const affix_string = weekly_affixes.data.title
				character_array.push(`This week's affixes are: ${affix_string}`)
	
			}

			await postProcessArray() // must be called with await
			return character_array
		}
	}
}