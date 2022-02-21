const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 data: new SlashCommandBuilder()
	.setName('update')
	.setDescription('Replies with your input!')
	.addStringOption(option => option.setName('character').setDescription('The input to echo back').setRequired(true))
	.addStringOption(option => option.setName('realm').setDescription('The second input to echo back').setRequired(true))
	.addStringOption(option => option.setName('key').setDescription('The second input to echo back').setRequired(true))
	.addStringOption(option => option.setName('number').setDescription('The second input to echo back').setRequired(true)),
	async execute(interaction) {
		// const user = interaction.options.getUser('target');
		console.log(interaction.user.id)
		console.log(interaction.user.username)

		let reply = interaction.options.getString('input')
		let reply2 =  interaction.options.getString('input2')
		return interaction.reply(reply + "  " + reply2);
		// return interaction.reply(interaction.options.getString('input'));

		
	},
};
