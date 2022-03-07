module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		//handling a menu selection
		if (interaction.isSelectMenu()) {
			console.log(`menu customId event: "${interaction.customId}" from user: ${interaction.user.username}`)
			const command = interaction.client.selectMenus.get(interaction.customId); //defined in index.js
			if (!command) return;
			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

		// handling a button press
		else if (interaction.isButton()) {
			// console.log("button customId event: " + interaction.customId + " from user: " + interaction.user.username)
			console.log(`button customId event: "${interaction.customId}" from user: ${interaction.user.username}`)
			const command = interaction.client.button.get(interaction.customId); //defined in index.js

			if (!command) return;
			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}

		//regular slash command handling
		} else (interaction.isCommand())
		
		if(typeof(commandName) != 'undefined') { 

		console.log(`commandName event: "${interaction.commandName}" from user: ${interaction.user.username}`)}
		
		const command = interaction.client.commands.get(interaction.commandName); //defined in index.js

		if (!command) return;

		try {
		  await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
};