
const fs = require('fs');

const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray // do we need to call this here?
const findCharacterIndex = helpers.findCharacterIndex
const util = require('util')
const axios = require('axios')
const APIpaths = require('../APIpaths');
const periodAPI = APIpaths.periodAPI
const us_region = 0

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	customId: "key-level", //this customId is read here, and emitted by ./selectmenus/addKeyTypeMenu.js 


	data: new SlashCommandBuilder()
		.setName('nowhere-yet')
		// .setName('key-level-amt')
		.setDescription('Replies with your input!')
		.addStringOption(option => option.setName('your key level').setDescription('must be a number between 2-100').setRequired(true)),
	async execute(interaction) {
		const rawdata = fs.readFileSync('../Zapros-bot/key_data.json'); // proper call in discord 


		const msg = interaction.message.content

		let key_number = interaction.values[0]

		let key_type = msg.substring(
			msg.indexOf("[") + 1,
			msg.lastIndexOf("]")
		);

		const character_name = msg.substring(
			msg.indexOf("(") + 1,
			msg.lastIndexOf("-")
		);
		const realm_name = msg.substring(
			msg.indexOf("-") + 1,
			msg.lastIndexOf(")")
		);

	

		//locate this characterin the database, return an index value. first find user

		let target_index = findCharacterIndex(interaction.user.id, rawdata, character_name, realm_name) 
		console.log(`target index is: ${target_index}`)

		let userdata = JSON.parse(rawdata);

		const discordId = (element) => element == interaction.user.id
		const user_index = createUserIdArray(rawdata).findIndex(discordId)

		async function setValuesandPeriodNumber() { // we need an async wrapper here to handle our API calls
			const res = await axios.get(periodAPI)
			const current_period = res.data.periods[us_region].current.period
			
			 
			userdata.users[user_index].characters[target_index].key_level = key_number
			userdata.users[user_index].characters[target_index].weekly_key = key_type
			userdata.users[user_index].characters[target_index].key_period = current_period
	
	
			const writeFile = util.promisify(fs.writeFile)
			userdata = JSON.stringify(userdata, null, 2);
			await writeFile('../Zapros-bot/key_data.json',userdata )
		
		}
		await setValuesandPeriodNumber()

	
		return interaction.update({ content: `Your key for ${character_name}-${realm_name} has been updated to: ${key_number} [${key_type}]`, components: [], ephemeral: true });


	},


};






 // if we don't call this with await, then we get some weird behavior
