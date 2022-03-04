
module.exports = {
    customId: "primary-test",
   
	async execute(interaction) {

        console.log(interaction)
        console.log("inside button received")

	    await interaction.reply({ content: 'You pressed a button', ephemeral: true });

	},

    
};
