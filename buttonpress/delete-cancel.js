module.exports = {
    customId: "no-delete",
    async execute(interaction) {
        await interaction.update({ content: 'No characters were deleted!', components: [], ephemeral: true });
    },
};
