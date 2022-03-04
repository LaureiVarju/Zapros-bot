
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	customId: "key-level", //this customId is read here, and emitted by ./selectmenus/addKeyTypeMenu.js 


	data: new SlashCommandBuilder()
		.setName('nowhere-yet')
		// .setName('key-level-amt')
		.setDescription('Replies with your input!')
		.addStringOption(option => option.setName('your key level').setDescription('must be a number between 2-100').setRequired(true)),
	async execute(interaction) {


		const msg = interaction.message.content

		let key_number = interaction.values[0]

		let key_type = msg.substring(
			msg.indexOf("[") + 1,
			msg.lastIndexOf("]")
		);

		const character_name = msg.substring(
			msg.indexOf("(") + 1,
			msg.lastIndexOf("-")
		);
		const realm_name = msg.substring(
			msg.indexOf("-") + 1,
			msg.lastIndexOf(")")
		);

		const userid = interaction.user.id

		//locate this characterin the database, return an index value. first find user


		return interaction.reply({ content: `Your key for ${character_name}-${realm_name} has been updated to: ${key_number} [${key_type}]`, ephemeral: true });


	},


};

//helper functions

function findUserIndex(userid){

}

function findCharacterIndex(charname, realmname){

}
