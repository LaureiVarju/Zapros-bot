// const fs = require('fs');
// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!'),
// 	new SlashCommandBuilder().setName('options').setDescription('Information about the options provided'),
// ]
// 	.map(command => command.toJSON());

// const rest = new REST({ version: '9' }).setToken(token);
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// //this part is new
// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	commands.push(command.data.toJSON());
// 	console.log(`Successfully registered application commands for ${file}.`)
// }

// console.log("line 23")
// //is this being reached?
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands HI.'))
// 	.catch(console.error);
// 	console.log("in rest statement")

	const fs = require('fs');
	const { REST } = require('@discordjs/rest');
	const { Routes } = require('discord-api-types/v9');
	const { clientId, guildId, token } = require('./config.json');
	
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}
	
	const rest = new REST({ version: '9' }).setToken(token);
	
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);