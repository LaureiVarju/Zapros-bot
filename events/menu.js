module.exports = {
	name: 'menu',
	async execute(interaction) {
		client.on('interactionCreate', interaction => {
			if (!interaction.isSelectMenu()) return;
			console.log(interaction);
		});
	},
};

