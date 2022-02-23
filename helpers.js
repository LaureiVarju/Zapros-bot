//TODO
// keep exploring menus
// Fix the key level problem with the menus
// Use the echo method for base MVP functionality because it's the easiest.

// Work on string matching
console.log("inside helpers")

const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json');
const userdata = JSON.parse(rawdata);
const number_of_users = userdata.users.length
let userid = '225812069704925184'
// let userid = interaction.user.id
const discordId = (element) => element == '225812069704925184'
// const discordId = (element) => element == interaction.user.id;


async function createCharacterArrayForMenu() {
  console.log("inside createCharacterArrayForMenu()")


  if (await createUserArray().includes('225812069704925184') == true) {
  // if (createUserArray().includes(interaction.user.id) == true) {

    // console.log('you exist!')
    let user_index = createUserArray().findIndex(discordId)
    // console.log('index value is  ' + userid)

    //now make the key array for just this user
    let character_array = []



    for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
      // console.log('value of y is ' + y)

				const character_name = userdata.users[user_index].characters[y].character_name
				const realm = userdata.users[user_index].characters[y].realm
				const character_class = userdata.users[user_index].characters[y].character_class

      //   row_data = JSON.stringify(userdata.users[user_index].characters[y].weekly_key + ' ' + userdata.users[user_index].characters[y].name + ' ' + userdata.users[user_index].characters[y].class)
      
      let row_data = {
        label: JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')').replace(/"/g, ''),
        name: JSON.stringify(character_name).replace(/"/g, ''),
        realm: JSON.stringify(realm).replace(/"/g, '')
      }
      // row_data = JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')')
      // cleaned_string = row_data.label.replace(/"/g, '')
      character_array.push(row_data)


      //if we reach this part of the loop, we're done
      if (y == userdata.users[user_index].characters.length - 1) {
        console.log("returning from createCharacterArrayforMenu")
        return character_array

      }
    }

    /// end of array logic

  } else {
    const NOT_IN_DATABASE = `I have no record of you, [value ]! Use "/addcharacter" to create an entry!`
    console.log("no record for this user exists")
    return NOT_IN_DATABASE
  }
}


 

//helper functions
async function createUserArray() {
  console.log("inside CreateUserArray of")
  let user_array = []
  //outer loop i is set by our overall user level
  for (let i = 0; i < number_of_users; i++) {
    row_data = JSON.stringify(userdata.users[i].discordid)
    cleaned_string = row_data.replace(/"/g, '')


    user_array.push(cleaned_string)
    //if we reach this part of the loop, we're done
    if (i == number_of_users - 1) {
      // console.log("i == number of users - 1")
      // console.log(user_array)
      console.log("returning from CreateUserArray")
      return user_array
    }
  }
}

// console.log(createCharacterArrayForMenu())

exports.createCharacterArrayForMenu = createCharacterArrayForMenu;