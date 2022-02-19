module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = 'button'

		if (!command) return;

		try {
            console.log("in the try block of button")
			await command.execute(interaction);
			
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	},
};

