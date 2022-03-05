// for local testing
      // "discordid": "222059182445035522", <- Dark

const fs = require('fs');
const rawdata = fs.readFileSync('../Zapros-bot/key_data.json'); // proper call in discord 
const helpers = require('./helpers');
const createUserIdArray = helpers.createUserIdArray


const userid = '225812069704925184'
const character_name = 'Rhiona'
const ream_name = "Elune"

// console.log(rawdata)

//end of local testing


// // we can assume when this is called, that the user DOES exist and DOES have characters 
// but we may want to handle it anyway with a try/catch
function findCharacterIndex(userid, rawdata, character_name, realm_name) {
	const userdata = JSON.parse(rawdata);
	let indexOfTargetCharacter = null

	let indexOfUser = createUserIdArray(rawdata).indexOf(userid)

	let character_array = userdata.users[indexOfUser].characters
	// console.log(character_array)



	for (let i = 0; i < character_array.length; i++) {

	// 	// search through the character array to find a match for name and realm. This should always return something because these values are being provided
	// 	// from a pre-populated list of existing characters the user has chosen. Even still, we should account for unexpected errors.
		if (character_array[i].character_name == character_name && character_array[i].realm == realm_name) {
			// we have a match, grab the index value.
			indexOfTargetCharacter = i

		}
	}

	if (indexOfTargetCharacter != null || NaN) {

			console.log(character_array[indexOfTargetCharacter])

		return indexOfTargetCharacter
	}
	else {
		console.log('indexOfTargetCharacter is null or NaN: ' + indexOfTargetCharacter)
		return 'character could not be found'

	}

}
console.log(findCharacterIndex(userid, rawdata, character_name, ream_name))
// findCharacterIndex(userid, rawdata, character_name,ream_name)

// exports.createUserIdArray = createUserIdArray;
// exports.createCharacterArrayForMenu = createCharacterArrayForMenu;