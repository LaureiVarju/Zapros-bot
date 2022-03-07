const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle("Hi, I'm Zapros!")
	.setDescription("I'm a bot that lets you and your friends keep track of your mythic + keys")
	.setThumbnail('https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif')
	.addFields(
		{ name: '__Try these commands!__', value: '\u200B' },
		{ name: '```/addcharacter```', value: 'Adds a new character to Zapros' },
		{ name: '```/update```', value: 'Update your key data for any character' },
		{ name: '```/keys```', value: 'Reports all up-to-date key data Zapros has for this week' },
		{ name: '```/mykeys```', value: 'Reports your up-to-date key data for the week' },
		{ name: '```/delete```', value: 'Allows you to delete any or all of your own characters' },
		{ name: '```/joke```', value: 'Tells you a really, really, corny joke' }
	)
	.setImage('https://c.tenor.com/KC5HIotG-bgAAAAd/cute-robot.gif')
	.setTimestamp()
	.setFooter({ text: 'Zapros: v1.0.0-beta made by Vizu' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Explains all of Zapros'commands"),

	async execute(interaction) {
		return interaction.reply({ content: `Hi ${interaction.user.username}! 😊 Here's what I can do!`, embeds: [exampleEmbed], ephemeral: true })
	},
};