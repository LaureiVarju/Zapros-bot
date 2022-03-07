// TODO Make dynamic region-specific calls in keys logic
// set regions [0] to "en"
// I'm currently using US region-section array locations for my logic when digging into results
const locale = 'en'
const region = 'us'
const periodAPI = 'https://raider.io/api/v1/periods'
const affixAPI = `https://raider.io/api/v1/mythic-plus/affixes?region=${region}&locale=${locale}`


exports.periodAPI = periodAPI;
exports.affixAPI = affixAPI;
