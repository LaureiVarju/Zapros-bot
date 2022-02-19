const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { readdirSync } = require('node:fs')
const isJs = file => file.endsWith('.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	
		interaction.client.commands = new Collection(readdirSync('./commands').filter(isJs).map(path => {
		  const cmd = require(path)
		  return [cmd.data.name, cmd]
		}))
		
		readdirSync('./events').filter(isJs).forEach(path => {
		  const { name, once, execute } = require(path)
		  client[ once ? 'once' : 'on'](name, execute)
		})
		
		client.login(token);
		
	},
};

