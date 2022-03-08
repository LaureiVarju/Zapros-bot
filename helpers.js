// Creates an array of all user ids ie: ["225812069704925184", "222059182445035522"]
// used to easily determine the index of a user, or if they exist at all
function createUserIdArray(rawdata) {
	const userdata = JSON.parse(rawdata);
	let number_of_users = userdata.users.length
	let user_array = []
	//outer loop i is set by our overall user level
	for (let i = 0; i < number_of_users; i++) {
		row_data = JSON.stringify(userdata.users[i].discordid)
		cleaned_string = row_data.replace(/"/g, '')
		user_array.push(cleaned_string)
		//if we reach this part of the loop, we're done
		if (i == number_of_users - 1) {
			return user_array
		}
	}
}

// creates an array of all existing character names (and their realm names) for a given user. 
// Used to dynamically populate any menus that feature characters (update.js, delete.js)
function createCharacterArrayForMenu(userid, rawdata) {
	const userdata = JSON.parse(rawdata);
	const discordId = (element) => element == userid


	if (createUserIdArray(rawdata).includes(userid) == true) {

		let user_index = createUserIdArray(rawdata).findIndex(discordId)
		let character_array = []

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

	} else {
		console.log("no record for this user exists - createUserIdArray")
		character_array = [{ label: 'NULL', value: 'NULL' }]
		return character_array
	}
}

// this will find where in the user's character array a targeted character exists, by cross-referencing the character name and realm name provided
//  we can assume when this is called, that the user DOES exist and DOES have characters 
function findCharacterIndex(userid, rawdata, character_name, realm_name) {
	const userdata = JSON.parse(rawdata);
	let indexOfTargetCharacter = null
	let indexOfUser = createUserIdArray(rawdata).indexOf(userid)
	let character_array = userdata.users[indexOfUser].characters

	for (let i = 0; i < character_array.length; i++) {

		// 	search through the character array to find a match for name and realm. This should always return something because these values are being provided
		// 	from a pre-populated list of existing characters the user has chosen. Even still, we should account for unexpected errors.
		if (character_array[i].character_name == character_name && character_array[i].realm == realm_name) {
			// we have a match, grab the index value.
			indexOfTargetCharacter = i
		}
	}

	if (indexOfTargetCharacter != null || NaN) {
		// console.log(character_array[indexOfTargetCharacter])
		return indexOfTargetCharacter
	}
	else {
		// console.log('unexpected value for indexOfTargetCharacter: ' + indexOfTargetCharacter)
		return -1
	}
}

exports.findCharacterIndex = findCharacterIndex
exports.createUserIdArray = createUserIdArray
exports.createCharacterArrayForMenu = createCharacterArrayForMenu