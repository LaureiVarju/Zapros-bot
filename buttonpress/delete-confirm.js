const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray
const findCharacterIndex = helpers.findCharacterIndex
const fs = require('fs');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

module.exports = {
    customId: "yes-delete",
   
	async execute(interaction) {
        const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
        let userid = interaction.user.id

        const discordId = (element) => element == userid
        let user_index = -1 

        // the user should always exist in this scenario, but just in case they don't, our default index is -1 to throw an out-of-bounds error
        if (createUserIdArray(rawdata).includes(userid) == true) {
            user_index = createUserIdArray(rawdata).findIndex(discordId)
        }
        let userdata = JSON.parse(rawdata);

        // if we have only a single character selected, we enter this block
        if (interaction.message.content != "Are you sure you wish to delete: all of your characters?"){

            // we capture the character selected ...
            let realm = interaction.message.content.split('-')[1].split('?')[0].trim()
            let character = interaction.message.content.split(':')[1].split('-')[0].trim()
        
            // ...and use the user_index variable and findCharacterIndex function to target the correct entry
            delete userdata.users[user_index].characters[findCharacterIndex(userid,rawdata,character,realm)]
            userdata.users[user_index].characters = userdata.users[user_index].characters.filter(x => x !== null)
            userdata = JSON.stringify(userdata, null, 2);
		    await writeFile('../Zapros-bot/key_data.json',userdata )
            await interaction.update({ content: `${character} has been deleted!`, components: [], ephemeral: true });

        } else {
            // if a user wishes to delete all characters, we delete the user object entirely here
            delete userdata.users[user_index]
           
            // deleting an entry creates a null in our data scheme that throws errors
            // this filters them out before we write
            userdata.users= userdata.users.filter(x => x !== null) 
           
            userdata = JSON.stringify(userdata, null, 2);
			await writeFile('../Zapros-bot/key_data.json',userdata )

            await interaction.update({ content: 'All of your characters have been deleted!', components: [], ephemeral: true });
        }
	},
};