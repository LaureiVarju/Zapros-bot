const { SlashCommandBuilder } = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("Hi, I'm Zapros!")
	.setDescription("I'm a bot that lets you and your friends keep track of your mythic + keys!\n\nVersion: 1.0.0-beta")
	.setThumbnail('https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif')
	.addFields(
		{ name: 'Try these commands!', value: '\u200B' },
		{ name: '/addcharacter', value: 'Adds a new character to my records' },
		{ name: '/update', value: 'Lets you update your key data for any character' },
		{ name: '/keys', value: 'Reports all up-to-date key data I have for this week' },
		{ name: '/mykeys', value: 'Reports only YOUR up-to-date key data for the week' },
		{ name: '/delete', value: 'Allows you to delete any or all of your own characters' }
	
	)
	// .addField('Inline field title', 'Some value here', true)
	.setImage('https://c.tenor.com/KC5HIotG-bgAAAAd/cute-robot.gif')
	.setTimestamp()
	.setFooter({ text: 'Zapros: v1.0.0-beta made by Vizu'});



module.exports = {
 data: new SlashCommandBuilder()
	.setName('help')
	.setDescription("Explains all of Zapros'commands"),

	async execute(interaction) {



		return interaction.reply({ content: `Hi ${interaction.user.username}! 😊 Here's what I can do!`, embeds: [exampleEmbed], ephemeral: true})
		
	},
};



