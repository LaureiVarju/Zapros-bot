const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 data: new SlashCommandBuilder()
	.setName('update')
	.setDescription('Replies with your input!')
	.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction) {
		// const user = interaction.options.getUser('target');
		console.log(interaction.user.id)
		console.log(interaction.user.username)
		return interaction.reply(interaction.options.getString('input'));
		
	},
};



