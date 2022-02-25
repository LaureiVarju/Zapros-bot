const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option => option.setName('character').setDescription('name of the character').setRequired(true))
	.addStringOption(option => option.setName('realm').setDescription('your realm name').setRequired(true))
	.addStringOption(option => option.setName('key-name').setDescription('your key (ie. HOA or SD)').setRequired(true))
	.addStringOption(option => option.setName('key-level').setDescription('the number of your key').setRequired(true)),
	async execute(interaction) {
		// const user = interaction.options.getUser('target');
		console.log(interaction.user.id)
		console.log(interaction.user.username)
		console.log(interaction.options._hoistedOptions)

		let key_level =  interaction.options._hoistedOptions[3].value
		console.log(key_level)

		return interaction.reply(interaction.options.getString('character'));
		
	},
};



