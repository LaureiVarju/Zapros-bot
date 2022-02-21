const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('keys')
		.setDescription('Reports all keys'),
	// populate an array based on JSON data, and spit back the array
	async execute(interaction) {
		// return interaction.reply({ content:  reportAllKeys().join('\n'), ephemeral: false })
		let results = await reportAllKeys() //returns an object
		const array_results = Object.values(results); //turning the obkect into an array so I can call .join in the results
		return interaction.reply({ content: array_results.join('\n'), ephemeral: false })
	}
};

const moment = require('moment')
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length
const axios = require('axios')
// TODO
// These two API strings should be declared elsewhere and called in, not defined here.
// also note that I'm using all of the US region-section data for my logic when digging into the results
const periodAPI = 'https://raider.io/api/v1/periods'
const affixAPI = 'https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en'

async function reportAllKeys() {

	let character_array = []

	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		// y is the amount of characters a user has
		// This next loop populates all of the characters for the i user before incrementing i
		// y has to be intialized here and incremented
		for (let y = 0; y < userdata.users[i].characters.length; y++) {
			// console.log('value of y is ' + y)
			async function getPeriodNumber() {
				const res = await axios.get(periodAPI)
				const current_period = res.data.periods[0].current.period
				const last_recorded_character_key_period = userdata.users[i].characters[y].key_period
				const character_name = userdata.users[i].characters[y].character_name
				const weekly_key = userdata.users[i].characters[y].weekly_key
				const key_level = userdata.users[i].characters[y].key_level
				const realm = userdata.users[i].characters[y].realm
				const character_class = userdata.users[i].characters[y].character_class

				if (current_period != last_recorded_character_key_period) {
					console.log("Key for " + character_name + " is out of date: " + `${last_recorded_character_key_period} is ${(current_period - last_recorded_character_key_period)} week(s) behind current period ${current_period}`)
				}
				if (current_period == last_recorded_character_key_period) {

					row_data = JSON.stringify(weekly_key + ' ' + '[' + key_level + ']' + ' ' + character_name + '-' + realm + ' ' + '(' + character_class + ')')
					cleaned_string = row_data.replace(/"/g, '')
					console.log("array length is " + character_array.length)
					character_array.push(cleaned_string)
				}

			}
			await getPeriodNumber()
		}


		// if we reach here, we're ready to post-process and return the array
		console.log("array length at line 73 is " + character_array.length)
		if (i == number_of_users - 1) {
			console.log("i == number of users - 1")
			if (character_array.length == 0) {
				character_array.push("I have no key data this week! Use /update to enter this week's keys")
			}

			// wrapping the last of this in an async function to handle the API calls
			async function postProcessArray() {// call before we leave the if block
				// Adding weekly date range
				const week_dates_call = await axios.get(periodAPI)
				const beginning_date = moment(week_dates_call.data.periods[0].current.start).format('MMM Do')
				const ending_date = moment(week_dates_call.data.periods[0].current.end).format('MMM Do')
				character_array.unshift(`Keys for the week of: ${beginning_date} - ${ending_date}`)

				//Adding weekly affixes
				const weekly_affixes = await axios.get(affixAPI)
				const affix_string = weekly_affixes.data.title
				character_array.push(`This week's affixes are: ${affix_string}`)


				return character_array // this can be reached by the top and does report all characters, but no post processing data
			}

			await postProcessArray()
			return character_array
		}
	}
}