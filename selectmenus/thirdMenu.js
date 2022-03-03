
const presets = require('../presets');
const key_level_menu = presets.key_level_menu



const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const key_level_numbers = new MessageActionRow()
.addComponents(
	new MessageSelectMenu()
		.setCustomId('key-level')
		.setPlaceholder('Select a level for your key')
		.addOptions(key_level_menu)
);

module.exports = {
 
	customId: "key-name", //this customId is read here, and emitted by ./selectmenus/addKeyTypeMenu.js 




		async execute(interaction) {

			// console.log('interaction in third menu. Values is key type. Find char name in message, content')
			// console.log(interaction.message.content)
			
			// let charname_and_realm = interaction.message.content.split(':')[1].trim()
			let realm = interaction.message.content.split('-')[1].trim()
			let charname = interaction.message.content.split(':')[1].split('-')[0].trim()
			let key_type = interaction.values[0]
			

			// console.log("charname_and_realm = "+charname_and_realm)
			// console.log("realm  = " + realm)
			// console.log("charname  = " + charname)
			// console.log("key name = " + interaction.values)

					// return interaction.reply(interaction.options.getString('input'));
					// return interaction.reply({content: `Your key is ${interaction.values} your character is ${charname_and_realm}`, ephemeral: true});
					await interaction.update({ content: `Choose a level for your [${key_type}] key for (${charname}-${realm}) `, ephemeral: true, components: [key_level_numbers]  });
					// await interaction.update({ content: `yadda`, ephemeral: true, components: [key_level_numbers]  });
					
		},

    
};

