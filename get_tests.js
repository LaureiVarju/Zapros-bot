const axios = require('axios')
const moment = require('moment')

periodAPI = 'https://raider.io/api/v1/periods'

affixAPI = 'https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en'

region = 'en'
realm = "elune"
character_name = 'vizu'

characterDetails = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character_name}&fields=mythic_plus_ranks`



// // const getPeriod = async () => {
// //   try {
// //     return await axios.get(periodAPI)
// //   } catch (error) {
// //     console.error(error)
// //   }
// // }

// // const axios = require('axios')

// const getPeriod = async () => {
//   try {
//     return await axios.get(periodAPI)
//   } catch (error) {
//     console.error(error)
//   }
// }

// let data = await getPeriod()
// console.log(data)

let testy= async () =>{

 await resolve(axios.get(periodAPI)).then(value)
}



const promise1 = new Promise((resolve, reject) => {
  resolve(axios.get(periodAPI));


});

promise1.then((value) => {

 console.log( value.data.periods[0].current.period)

});

const  promise2 = new Promise((resolve, reject) => {
  resolve(axios.get(affixAPI));
});

promise2.then((value) => {
  console.log(value.data.title);
  // expected output: "Success!"
});

promise1.then((value) => {
  // console.log(moment(value.data.periods[0].current.start).format('MMM Do'));
  // expected output: "Success!"
});

promise1.then((value) => {
  console.log(moment(value.data.periods[0].current.end).format('MMM Do'))
  // expected output: "Success!"
});

// console.log(moment().format('MMM Do'))
// console.log(period_value)



const promise5 = new Promise((resolve, reject) => {
  resolve(axios.get(periodAPI));


})

promise5.then(value)

console.log(check)



  // console.log( value.data.periods[0].current.period)
