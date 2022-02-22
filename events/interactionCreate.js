module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (interaction.isSelectMenu()) {
			// select menu process
		} else if (interaction.isCommand()) {
			// slashie process

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {

				await command.execute(interaction);
				console.log("in the try block of interactionCreate")
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}


		}


	},
};

