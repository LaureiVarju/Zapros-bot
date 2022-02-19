const axios = require('axios')
periodAPI = 'https://raider.io/api/v1/periods'


async function getPeriodNumber() {
  const res = await axios.get(periodAPI)


  
  return  res.data.periods[0].current.period


}


