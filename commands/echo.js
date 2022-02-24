const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option => option.setName('character').setDescription('The input to echo back').setRequired(true))
	.addStringOption(option => option.setName('key').setDescription('The input to echo back').setRequired(true))
	.addStringOption(option => option.setName('realm').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction) {
		// const user = interaction.options.getUser('target');
		console.log(interaction.user.id)
		console.log(interaction.user.username)
		return interaction.reply(interaction.options.getString('input'));
		
	},
};



