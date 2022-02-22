const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');


module.exports = {

	
	
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('select two options'),
	async execute(interaction) {


	
		console.log(row.components[0].options[0].value) // DOS

		// interaction.options.getString('input')

		if (interaction.customId === 'select'){
		console.log('select was picked')
		}
		await interaction.reply({ content: 'Pick something!', components: [row, row2] });
		// return interaction.reply( this.row);
	},
};


const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('someid')
					.setPlaceholder('Select a dungeon')
					.addOptions([
						{
							label: 'DOS',
							description: 'De Other Side',
							value: 'DOS',
						},
						{
							label: 'HOA',
							description: 'Halls of Atonement',
							value: 'HOA',
						},
						{
							label: 'MISTS',
							description: 'Mists of Tirna Scithe',
							value: 'MISTS',
						},
						{
							label: 'NW',
							description: 'Necrotic Wake',
							value: 'NW',
						},
						{
							label: 'PF',
							description: 'Plaguefall',
							value: 'PF',
						},
						{
							label: 'SD',
							description: 'Sanguine Depths',
							value: 'SD',
						},
						{
							label: 'SOA',
							description: 'Spires of Ascension',
							value: 'SOA',
						},
						{
							label: 'TOP',
							description: 'Theater of Pain',
							value: 'TOP',
						},
					]),
			);
const row2 = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('levels')
			.setPlaceholder('Select your key level')
			.addOptions([
				{
					label: '+2',
					// description: 'De Other Side',
					value: '2',
				},
				{
					label: '+3',
					// description: 'Halls of Atonement',
					value: '3',
				},
				{
					label: '+4',
					// description: 'Mists of Tirna Scithe',
					value: '4',
				},
				{
					label: '+5',
					// description: 'Necrotic Wake',
					value: '5',
				},
				{
					label: '+6',
					// description: 'Plaguefall',
					value: '6',
				},
				{
					label: '+7',
					// description: 'Sanguine Depths',
					value: '7',
				},
				{
					label: '+8',
					// description: 'Spires of Ascension',
					value: '8',
				},
				{
					label: '+9',
					// description: 'Theater of Pain',
					value: '9',
				},
				{
					label: '+10',
					// description: 'Theater of Pain',
					value: '10',
				},
				{
					label: '+11',
					// description: 'Theater of Pain',
					value: '11',
				},
				{
					label: '+12',
					// description: 'Theater of Pain',
					value: '12',
				},
				{
					label: '+13',
					// description: 'Theater of Pain',
					value: '13',
				},
				{
					label: '+14',
					// description: 'Theater of Pain',
					value: '14',
				},
				{
					label: '+15',
					// description: 'Theater of Pain',
					value: '15',
				},
				{
					label: '+16',
					// description: 'Theater of Pain',
					value: '16',
				},
				{
					label: '+17',
					// description: 'Theater of Pain',
					value: '17',
				},
				{
					label: '+18',
					// description: 'Theater of Pain',
					value: '18',
				},
				{
					label: '+19',
					// description: 'Theater of Pain',
					value: '19',
				},
				{
					label: '+20',
					// description: 'Theater of Pain',
					value: '20',
				},
				{
					label: '+21',
					// description: 'Theater of Pain',
					value: '21',
				},
				{
					label: '+22',
					// description: 'Theater of Pain',
					value: '22',
				},
				{
					label: '+23',
					// description: 'Theater of Pain',
					value: '23',
				},
				{
					label: '+24',
					// description: 'Theater of Pain',
					value: '24',
				},
				{
					label: '+25',
					// description: 'Theater of Pain',
					value: '25',
				},
			
			]),
	);




// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		const row = new MessageActionRow()
			

// 		await interaction.reply
// 	}
// });