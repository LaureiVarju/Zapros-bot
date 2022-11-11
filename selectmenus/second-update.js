
const presets = require('../presets');
const key_menu = presets.key_menu
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');


const key_type_menu = new ActionRowBuilder()
.addComponents(
    new SelectMenuBuilder()
        .setCustomId('key-name')
        .setPlaceholder('Select a key')
        .addOptions(key_menu)
);

module.exports = {
    customId: "characterSelected", // this customId property is crucial for this component to BE reached from update.js where it is set and emitted
   
	async execute(interaction) {
   
       let character_selected = interaction.values
	    await interaction.update({ content: `Choose a key for: ${character_selected}`, ephemeral: true, components: [key_type_menu]  });
	},
};