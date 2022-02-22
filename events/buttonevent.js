const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
	name: 'button',
	async execute(interaction) {
        console.log("inside buttonevent.js")
		client.on('button', interaction => {
            if (!interaction.isButton()) return;
            console.log(interaction);
        });

	},
};

