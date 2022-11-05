const moment = require('moment')
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		//handling a menu selection
		if (interaction.isSelectMenu()) {
			console.log(`menu customId event: "${interaction.customId}" from user: ${interaction.user.username} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
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
			console.log(`button customId event: "${interaction.customId}" from user: ${interaction.user.username} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
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
		
		// used to suppress log messages where commandName is undefined, but can't be evaluated without causing an error
		let test_var = interaction.commandName
		if(test_var != undefined){
		console.log(`commandName event: "${test_var}" from user: ${interaction.user.username} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
		}
		
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