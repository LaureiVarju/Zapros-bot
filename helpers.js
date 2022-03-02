// Helper function that creates an array of all user ids ie: ["225812069704925184", "222059182445035522"]
// createCharacterArrayForMenu() in update.js uses the return value of createUserIdArray() to determine if the user exists in the JSON file, and if so, where
function createUserIdArray(number_of_users, userdata) {
	// console.log("inside CreateUserArray of")
	let user_array = []
	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		row_data = JSON.stringify(userdata.users[i].discordid)
		cleaned_string = row_data.replace(/"/g, '')
		user_array.push(cleaned_string)
		//if we reach this part of the loop, we're done
		if (i == number_of_users - 1) {
			// console.log("returning from CreateUserArray")
			return user_array
		}
	}
}

// we can assume when this is called, that the user DOES exist and DOES have characters 
function findCharacterIndex(userid, data, character_name, realm_name) {

	const discordId = (element) => element == userid

		let character_array = []

    let index = fruits.indexOf("Apple", 3);

		for (let y = 0; y < userdata.users[user_index].characters.length; y++) {
			// console.log('value of y is ' + y)
			const character_name = userdata.users[user_index].characters[y].character_name
			const realm = userdata.users[user_index].characters[y].realm
			const character_class = userdata.users[user_index].characters[y].character_class

			let row_data = {
				label: JSON.stringify(character_name + '-' + realm + ' ' + '(' + character_class + ')').replace(/"/g, ''),
				// this value property is somewhat redundant but we NEED it or the discordjs menu component won't work. It also HAS to be a string
				value: JSON.stringify(character_name + '-' + realm).replace(/"/g, '')
			}

			character_array.push(row_data)

			//if we reach this part of the loop, we're done
			if (y == userdata.users[user_index].characters.length - 1) {
				return character_array
			}
		}
		/// end of array logic

	} else {
		console.log("no record for this user exists")
		character_array = [{ label: 'NULL', value: 'NULL' }]
		return character_array
	}
}

exports.createUserIdArray = createUserIdArray;