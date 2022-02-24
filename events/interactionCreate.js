module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {


		//handling a menu select
		if (interaction.isSelectMenu()) {
			// console.log("In the interaction.selectMenu() is true block")
			console.log("menu customId = " + interaction.customId)
			// console.log( "interaction.client.selectMenus is: " + JSON.stringify(interaction.client.selectMenus))
			const command = interaction.client.selectMenus.get(interaction.customId);
			if (!command) return;
			try {
				
				await command.execute(interaction);

			}
			catch (error){
				//
			}


			// select menu process
		} else if (interaction.isCommand()) {
			// slashie process
			console.log('commandName = ' + interaction.commandName)
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
	}
};

