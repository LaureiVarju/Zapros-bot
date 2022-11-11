// const { Client, Collection, Intents } = require('discord.js');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });


// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });66/


const { readdirSync } = require('node:fs')

const isJs = file => file.endsWith('.js')

//defining paths for commands/interactions
client.commands = new Collection(readdirSync('./commands').filter(isJs).map(path => {
    const cmd = require(`./commands/${path}`)
    return [cmd.data.name, cmd]
}))

client.selectMenus = new Collection(readdirSync('./selectmenus').filter(isJs).map(path => {
    const cmd = require(`./selectmenus/${path}`)
    return [cmd.customId, cmd]
}))

client.button = new Collection(readdirSync('./buttonpress').filter(isJs).map(path => {
    const cmd = require(`./buttonpress/${path}`)
    return [cmd.customId, cmd]
}))

//defining path for starting up and handling events
readdirSync('./events').filter(isJs).forEach(path => {
	const { name, once, execute } = require(`./events/${path}`)
	client[once ? 'once' : 'on'](name, execute)
})

client.login(token)
