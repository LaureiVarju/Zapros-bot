const { ActionRowBuilder, ButtonBuilder} = require('discord.js');


const yes = new ActionRowBuilder().addComponents(
	new ButtonBuilder()
		.setCustomId('yes-delete')
		.setLabel('Yes')
		.setStyle('Success'),
)
const no = new ActionRowBuilder().addComponents(
	new ButtonBuilder()
		.setCustomId('no-delete')
		.setLabel('No')
		.setStyle('Danger'),
)

module.exports = {
    customId: "delete-selection", 
		async execute(interaction) {
		await interaction.update({ content: `Are you sure you wish to delete: ${interaction.values}?`, components: [yes, no] });
	}
};