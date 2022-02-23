
module.exports = {
    customId: "someid",
    execute(interaction)  {
        console.log("line 5 from testMenu.js")
        const menu_structures = require('../menu_structures.js') // this require is preventing me from getting to this block of code
        const menutest2 = menu_structures.menutest2
        // const character_menu_array = menu_structures.character_menu_array


        console.log('inside testMenu')
        console.log(menutest2)
        // console.log(character_menu_array)
       

        // interaction.user.id // discord id
        // interaction.user.userame Rhiona/Vizu
        // interaction.user.discriminator // 8868 
        // console.log(interaction.user.id) // discord id
        // console.log(interaction)
    //   interaction.reply('your key has been updated to ' + interaction.values[0])
       interaction.update({ content: 'Something was selected!', components: [] });
    }
  }