const axios = require('axios')
periodAPI = 'https://raider.io/api/v1/periods'


async function getPeriodNumber() {
  const res = await axios.get(periodAPI)
  console.log(res.data.periods[0].current.period)
  return  res.data.periods[0].current.period
}


getPeriodNumber()