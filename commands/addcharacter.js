const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const axios = require('axios')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addcharacter')
		.setDescription('Replies with your input!')
		.addStringOption(option => option.setName('character').setDescription('name of the character').setRequired(true))
		.addStringOption(option => option.setName('realm').setDescription('your realm name').setRequired(true)),

	async execute(interaction) {
		// const user = interaction.options.getUser('target');
		console.log(interaction.user.id)
		console.log(interaction.user.username)
		console.log(interaction.options._hoistedOptions)

		let userid = interaction.user.id
		let realm_name = interaction.options._hoistedOptions[1].value
		let character_name = interaction.options._hoistedOptions[0].value
		let api_character_call = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm_name}&name=${character_name}`

		async function checkCharacterStatusandSet() { // we need an async wrapper here to handle our API calls

	
				// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

			// const res = await axios.get(api_character_call)

			axios.get(api_character_call).then((response) => {
				console.log('Everything is awesome.');

				console.log(response)
				console.log(response.data.class)
				thumbnail = response.data.thumbnail_url
				api_char_name = response.data.name
				api_class = response.data.class

				const exampleEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${api_char_name} Added!`)
				// .setURL('https://discord.js.org/')
				// .setAuthor({ name: ${interaction.user.username}, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setDescription(`Your ${api_class}, ${api_char_name}, has been added`)
				.setThumbnail(thumbnail)
				.addFields(
					{ name: `Set up ${api_char_name}'s key data:`, value: 'Try using /update' },
					{ name: 'Or add another character:', value: 'use /addcharacter' },
					// { name: 'Faction', value: 'Some value here', inline: true },
					// { name: 'Race', value: 'Some value here', inline: true },
				)
				// .addField("Need to add or update key data? Try /update", true)
				// .setImage(thumbnail)
				.setTimestamp()
				return interaction.reply({ content: `Your character, ${character_name}-${realm_name} has been added! Try '/update' to update ${character_name}'s key data or '/addcharacter' to add another character`, embeds: [exampleEmbed], ephemeral: true })
			}).catch((error) => {
				console.warn('Not good man :(');
				// console.log(error.response.data.message) // catching errors from message embed, not axios or raiderapi
				return interaction.reply({ content: `${error.response.data.message}`, ephemeral: true })
				// return interaction.reply({ content: `${error}`, ephemeral: true })
			})

			// const res = axios.get(api_character_call)
			// 	.catch(function (error) {
			// 		if (error.response) {
			// 			// Request made and server responded
			// 			console.log('in the error.response block')
			// 			return interaction.reply({ content: `There was an error verifying your character, check your spelling and try again`, ephemeral: true })
			// 			// console.log(error.response.data);
			// 			// console.log(error.response.status);
			// 			// console.log(error.response.headers);
			// 		} else if (error.request) {
			// 			// The request was made but no response was received
			// 			return interaction.reply({ content: 'character verification service did not reply, please try again later' + error.request, ephemeral: true })
			// 			// console.log(error.request);
			// 		} else {
			// 			// Something happened in setting up the request that triggered an Error
			// 			console.log('Error', error.message);
			// 			return interaction.reply({ content: 'Something happened in setting up the request that triggered an Error' + error.message, ephemeral: true })
			// 		}


			// 	})
			// 	.try({

			// 		if (res.status == 200) {
			// 			console.log('this character exists')
			// 		} else if (res.statusCode == 400) {
			// 			console.log('mistakes were made')
			// 		}
			// 		else {
			// 			console.log('not enough data?')
			// 		}
			// 	}
			// 	);






		}
		return await checkCharacterStatusandSet()



		//success result
		// {
		// 	"name": "Vizu",
		// 	"race": "Draenei",
		// 	"class": "Shaman",
		// 	"active_spec_name": "Restoration",
		// 	"active_spec_role": "HEALING",
		// 	"gender": "female",
		// 	"faction": "alliance",
		// 	"achievement_points": 17525,
		// 	"honorable_kills": 0,
		// 	"thumbnail_url": "https://render-us.worldofwarcraft.com/character/elune/111/242307183-avatar.jpg?alt=wow/static/images/2d/avatar/11-1.jpg",
		// 	"region": "us",
		// 	"realm": "Elune",
		// 	"last_crawled_at": "2022-03-02T01:34:23.000Z",
		// 	"profile_url": "https://raider.io/characters/us/elune/Vizu",
		// 	"profile_banner": "alliancebanner1"
		//   }

		//   //bad
		//   {
		// 	"statusCode": 400,
		// 	"error": "Bad Request",
		// 	"message": "Could not find requested character"
		//   }

		//check if they exist
		// check their class
		// check if they're level 60


		// return interaction.reply({ content: `Your character, ${character_name}-${realm_name} has been added! Try '/update' to update ${character_name}'s key data or '/addcharacter' to add another character`, ephemeral: true })

	},
};



