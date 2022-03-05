
const helpers = require('../helpers');
const createUserIdArray = helpers.createUserIdArray
const findCharacterIndex = helpers.findCharacterIndex
const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const util = require('util')

const writeFile = util.promisify(fs.writeFile)

module.exports = {
    customId: "yes-delete",
   
	async execute(interaction) {

        console.log(interaction.message.content)
        //grab the user id here
        let userid = interaction.user.id
        console.log(userid)

        // figure out where the user exists on the array HERE (and call it in both scenarios)

        const discordId = (element) => element == userid

        let user_index = -1
        if (createUserIdArray(rawdata).includes(userid) == true) {
    
             user_index = createUserIdArray(rawdata).findIndex(discordId)
           
        }
        let userdata = JSON.parse(rawdata);

        console.log('user index = ' + user_index)
        // console.log(userdata.users[1])

        // if we have a single character selected, we enter this block
        if (interaction.message.content != "Are you sure you wish to delete: all of your characters?"){

        //we capture the character selected
        let realm = interaction.message.content.split('-')[1].split('?')[0].trim()
        let character = interaction.message.content.split(':')[1].split('-')[0].trim()
        
        console.log(realm)
        console.log(character)

            //find the user entry
            delete userdata.users[user_index].characters[findCharacterIndex(userid,rawdata,character,realm)]
            userdata.users[user_index].characters = userdata.users[user_index].characters.filter(x => x !== null)
            userdata = JSON.stringify(userdata, null, 2);
			await writeFile('../Zapros-bot/key_data.json',userdata )


        await interaction.update({ content: `${character} has been deleted!`, components: [], ephemeral: true });

        } else {
            //we delete the user object entirely.
            // and return a message specific to that event
            delete userdata.users[user_index]

            userdata.users= userdata.users.filter(x => x !== null)

            
			userdata = JSON.stringify(userdata, null, 2);
			await writeFile('../Zapros-bot/key_data.json',userdata )

            await interaction.update({ content: 'All of your characters have been deleted!', components: [], ephemeral: true });
        }

	  

	},
    
};
