const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const row = new MessageActionRow().addComponents(
	
	new MessageSelectMenu()
		.setCustomId('select')
		.setPlaceholder('Nothing selected')
		.setMinValues(1)
		.setMaxValues(3)
		.addOptions([
			{
				label: 'Select me',
				description: 'This is a description',
				value: 'first_option',
			},
			{
				label: 'You can select me too',
				description: 'This is also a description',
				value: 'second_option',
			},
			{
				label: 'I am also an option',
				description: 'This is a description as well',
				value: 'third_option',
			},
		]),
)

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('select two options'),
	async execute(interaction) {
		return interaction.reply({ content: 'You selected', components: [row] });
		// return interaction.reply( this.row);
	},
};



// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		const row = new MessageActionRow()
			

// 		await interaction.reply
// 	}
// });