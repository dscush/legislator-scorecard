const axios = require('axios')
const path = require('path');
const https = require('https');
const rootCas = require('ssl-root-cas').inject();

rootCas.addFile(path.resolve(__dirname, 'certs/intermediate.pem'));
const httpsAgent = new https.Agent({ca: rootCas});

function findLocalLegislators(coordinates) {
  return axios.get('https://malegislature.gov/Legislators/GetDistrictByLatLong', {
    params: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      isDistrictSearch: false,
    },
      httpsAgent,
  }).then(response => {
    memberCodes = {}
    response.data.districts.forEach(({ branch, userMemberCode }) => {
      if (branch.toLowerCase() === 'senate') {
        memberCodes.senator = userMemberCode
      } else if (branch.toLowerCase() === 'house') {
        memberCodes.representative = userMemberCode
      } else {
        throw new Error(`Unexpected chamber "${branch}". Member code: ${userMemberCode}, coordinates: ${coordinates.lat}, ${coordinates.lng}`)
      }
    })
    return memberCodes
  }).catch(function(error) {
      console.error('malegislature error:', error)
      throw error
  })
}

module.exports = findLocalLegislators
