const { MessageActionRow, MessageButton} = require('discord.js');

const yes = new MessageActionRow().addComponents(
	new MessageButton()
		.setCustomId('yes-delete')
		.setLabel('Yes')
		.setStyle('SUCCESS'),
)
const no = new MessageActionRow().addComponents(
	new MessageButton()
		.setCustomId('no-delete')
		.setLabel('No')
		.setStyle('DANGER'),
)

module.exports = {
    customId: "delete-selection", 
		async execute(interaction) {
		await interaction.update({ content: `Are you sure you wish to delete: ${interaction.values}?`, components: [yes, no] });
	}
};