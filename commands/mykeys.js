const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mykeys')
		.setDescription('reports your keys only'),
	async execute(interaction) {
		console.log("inside asynch execute from mykeys.")
	
		let userid = interaction.user.id
		const fs = require('fs');
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		// const userdata = JSON.parse(rawdata);
		const discordId = (element) => element == interaction.user.id;
		
		const moment = require('moment')

		
		// const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
		// const userdata = JSON.parse(rawdata);
		// const number_of_users = userdata.users.length
		
		async function getuserdata(){
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
				console.log('you exist!')
				let user_index = createUserIdArray(rawdata).findIndex(discordId)
				console.log('index value is  ' + userid)
		
						//now make the key array for just this user
						
				for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
					console.log("length of character array = " + userdata.users[user_index].characters.length )
		
				//outer loop i is set by our overall user level
				// for (let i = 0; i < number_of_users; i++) {
				// y is the amount of characters a user has
				// This next loop populates all of the characters for the i user before incrementing i
		
				// y has to be intialized here and incremented
			
					console.log('value of y is ' + y)
					async function checkPeriodNumber() { // we need an async wrapper here to handle our API calls
						const res = await axios.get(periodAPI)
						const current_period = res.data.periods[us_region].current.period
						const last_recorded_character_key_period = userdata.users[user_index].characters[y].key_period
						const character_name = userdata.users[user_index].characters[y].character_name
						const weekly_key = userdata.users[user_index].characters[y].weekly_key
						const key_level = userdata.users[user_index].characters[y].key_level
						const realm = userdata.users[user_index].characters[y].realm
						const character_class = userdata.users[user_index].characters[y].character_class
						console.log(current_period)
						console.log(last_recorded_character_key_period)
						console.log("line 73")
						// only pick up key data that is recent. Out of date key data will be ignored
						// if (current_period != last_recorded_character_key_period) {
						// 	console.log("Key for " + character_name + " is out of date: " + `${last_recorded_character_key_period} is ${(current_period - last_recorded_character_key_period)} week(s) behind current period ${current_period}`)
							
						
						// 	out_of_date_characters.push(character_name + "-" + realm )
						// 	console.log(out_of_date_characters)
						// }
						if (current_period == last_recorded_character_key_period) {
		
							row_data = JSON.stringify(weekly_key + ' ' + '[' + key_level + ']' + ' ' + character_name + '-' + realm + ' ' + '(' + character_class + ')')
							cleaned_string = row_data.replace(/"/g, '')
							character_array.push(cleaned_string)
						} else {
							console.log("Key for " + character_name + " is out of date: " + `${last_recorded_character_key_period} is ${(current_period - last_recorded_character_key_period)} week(s) behind current period ${current_period}`)
													
							out_of_date_characters.push(character_name + "-" + realm )
							console.log(out_of_date_characters)
						}
		
					}
					await checkPeriodNumber() // if we don't call this with await, then we get some weird behavior
				
		
		
				// if we reach here, we're ready to post-process and return the array
				if (y == number_of_users - 1) {
					// console.log("i == number of users - 1")
					if (character_array.length == 0) {
						character_array.push(`I have no recent data for any of your characters, ${user}! Try '/update' to update your key(s) data`)
					}
					}
				}
		
					// wrapping the last of this in an async function to handle the API calls
					async function postProcessArray() {
						// Adding weekly date range
						if (character_array[0] != `I have no recent data for any of your characters, ${user}! Try '/update' to update your key(s) data`){
						const week_dates_call = await axios.get(periodAPI)
						const beginning_date = moment(week_dates_call.data.periods[us_region].current.start).format('MMM Do')
						const ending_date = moment(week_dates_call.data.periods[us_region].current.end).format('MMM Do')
						character_array.unshift(`Your keys for the week of: ${beginning_date} - ${ending_date}`)
		
						//Adding weekly affixes
						const weekly_affixes = await axios.get(affixAPI)
						const affix_string = weekly_affixes.data.title
						character_array.push(`This week's affixes are: ${affix_string}`)
						if (out_of_date_characters.length > 0){
							character_array.push('__You have ' +  out_of_date_characters.length + ' character(s) with out of date key data. Use /update to enter any new key data__')
						}
						}
					
			
					}
		
					await postProcessArray() // must be called with await
					return character_array
				}
			
			
			else {
				const NOT_IN_DATABASE = `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`
				console.log("no record for this user exists")
				let character_array = []
				character_array[0] = NOT_IN_DATABASE
				return character_array
			}
		}
		
		if (myKeys()[0] != `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!` ){
			console.log("line 136")
			console.log(await myKeys())
			// return interaction.reply('made it to here')

			let final = await myKeys()
			final = final.join('\n')
			 
			return interaction.reply({content: final ,ephemeral: true})
			} 
			else {
				return interaction.reply({content: `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true})
			}
		
	}
}	
		


///// 

//inside async execute


// original mykeys

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('mykeys')
// 		.setDescription('reports your keys only'),
// 	async execute(interaction) {

// 		let userid = interaction.user.id
// 		const fs = require('fs');
// 		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
// 		const userdata = JSON.parse(rawdata);
// 		const discordId = (element) => element == interaction.user.id;

// 		// Some (or all) of your key data is out of date. Remember to use /update to update your key data!

// 		//use period logic to filter out, and if the filter gets hit, change a flag and append the array with a message
	

// 		// myKeys functions as follows:
// 		// 1. Using a helper method, it creates an array of users
// 		// 2. It checks to see if the user exists in the database
// 		// 3. If the user does exist, it generates a new array of just their key data
// 		function myKeys() {
// 			if (createUserIdArray(rawdata).includes(interaction.user.id) == true) {
// 				console.log('you exist!')
// 				let user_index = createUserIdArray(rawdata).findIndex(discordId)
// 				console.log('index value is  ' + userid)

// 				//now make the key array for just this user
// 				let character_array = []
// 				for (let y = 0; y < userdata.users[user_index].characters.length; y++) {

				
								
// 					row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + '[' + userdata.users[user_index].characters[y].key_level + ']' + ' ' + userdata.users[user_index].characters[y].character_name + '-' + userdata.users[user_index].characters[y].realm + ' ' + '(' + userdata.users[user_index].characters[y].character_class + ')')
// 					cleaned_string = row_data.replace(/"/g, '')
// 					character_array.push(cleaned_string)

// 					//if we reach this part of the loop, we're done
// 					if (y == userdata.users[user_index].characters.length - 1) {
// 						return character_array
// 					}
// 				}

// 			} else {
// 				const NOT_IN_DATABASE = `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`
// 				console.log("no record for this user exists")
// 				let character_array = []
// 				character_array[0] = NOT_IN_DATABASE
// 				return character_array
// 			}
// 		}
	
// 		if (myKeys()[0] != `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!` ){
// 		return interaction.reply({content: myKeys().join('\n') ,ephemeral: true})
// 		} else return interaction.reply({content: `I have no record of you, ${interaction.user.username}! Try using '/addcharacter' to get started!`, ephemeral: true})

// 	}
// };