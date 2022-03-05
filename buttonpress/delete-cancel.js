
module.exports = {
    customId: "no-delete",
   
	async execute(interaction) {

        // console.log(interaction)
        // console.log("INSIDE button received")

	    await interaction.update({ content: 'No characters were deleted!', components: [], ephemeral: true });

	},
    
};
