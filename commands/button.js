// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
// const row = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setCustomId('primary')
// 					.setLabel('Primary')
// 					.setStyle('PRIMARY'),
// 			);
// 			const embed = new MessageEmbed()
// 			.setColor('#0099ff')
// 			.setTitle('Some title')
// 			.setURL('https://discord.js.org')
// 			.setDescription('Some description here');


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('button')
// 		.setDescription('button'),
// 	async execute(interaction) {
// 		console.log(row)
// 		await interaction.reply({ content: 'button!', ephemeral: true, embeds: [embed], components: [row.label] });
// 		// await interaction.reply(interaction.row.);

// 	},
// };

// const { Client, Collection, Intents } = require('discord.js');




const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


const row1 = new MessageActionRow().addComponents(
	new MessageButton()
		.setCustomId('primary')
		.setLabel('Tank')
		.setStyle('PRIMARY'),
)
const row2 = new MessageActionRow().addComponents(
	new MessageButton()
		.setCustomId('success')
		.setLabel('Healer')
		.setStyle('SUCCESS'),
)
const row3 = new MessageActionRow().addComponents(
	new MessageButton()
		.setCustomId('danger')
		.setLabel('DPS')
		.setStyle('DANGER'),
)
module.exports = {



	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('button'),
	async execute(interaction) {
		// console.log(row1)
		// console.log(row2)
		await interaction.reply({ content: 'Pick your preferred role on this character:', components: [row1, row2, row3] });
		// console.log(interaction)

		client.on('interactionCreate', interaction => {
			if (!interaction.isButton()) return;
			// console.log(interaction);

			try {
				console.log("a button was pressed called" + interaction.customId)
				// await command.execute(interaction);
			} catch (error) {
				console.error(error);
				 interaction.reply({ content: 'error button message', ephemeral: true });
			}

		});
		// await interaction.reply('you pressed a button');
		// await interaction.reply(interaction.row.);

	}
};




