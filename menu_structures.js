console.log('inside menu structres')

const helpers = require('./helpers.js');
const createCharacterArrayForMenu = helpers.createCharacterArrayForMenu

console.log(await createCharacterArrayForMenu())

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const menutest2 = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('levels')
            .setPlaceholder('Select your key level')
            .addOptions([

                {
                    label: "test1",
                    value: "foo"
                },
                {
                    label: "test2",
                    value: "bar"
                },
                {
                    label: "test3",
                    value: "baz",
                    value2: "somehthing"
                }


            ]
            )
    );


    // const character_menu_array = new MessageActionRow()
    // .addComponents(
    //     new MessageSelectMenu()
    //         .setCustomId('characters')
    //         .setPlaceholder('Select a character to update key data')
    //         .addOptions(await createCharacterArrayForMenu())
    // );
    
  
exports.menutest2 = menutest2
// exports.character_menu_array = character_menu_array

//helpers.js
//*
// console.log("hi from helpers.js")
// function functionA(){
//     console.log("hi")
// }
// exports.functionA = functionA
// // ************************

// //FileA.js
// console.log("hi from FileA.js")
// const helpers = require('./helpers');
// const functionA = helpers.functionA

// function functionB(){
//     functionA()
// }
// exports.functionB = functionB

// //FileB.js
// const FileA = require('./FileA') // this line doesn't seem to execute because of the function call inside FileA.
// const functionB = FileA.functionB


