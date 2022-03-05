//this needs to be a button event, not a menu




const { MessageSelectMenu } = require('discord.js');


const { MessageActionRow, MessageButton, MessageEmbed, Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const confirm = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
        .setCustomId('key-name')
        .setPlaceholder('Select a key')
        .addOptions([
            {
                label: 'Yes',
                description: 'I wish to delete this character ',
                value: 'yes',
            },
            {
                label: 'No',
                description: 'Do not delete this character',
                value: 'no',
            }
        ])
);


// module.exports = {
//     customId: "delete-selection", // this customId property is crucial for this component to BE reached from update.js where it is set and emitted
   
// 	async execute(interaction) {
   
//     console.log(interaction.values)
// 	    await interaction.update({ content: `I should be a button`, ephemeral: true, components: []  });

// 	},

    
// };




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

		
		// console.log(row1)
		// console.log(row2)
		await interaction.update({ content: `Are you sure you wish to delete: ${interaction.values}?`, components: [yes, no] });
		// console.log(interaction)



	}
};
