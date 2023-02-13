const functions = require('firebase-functions')
const axios = require('axios')

const Geocodio = require('geocodio-library-node');
const geocoder = new Geocodio(process.env.GEOCODIO_API_KEY);

function geolocate(address) {
  return geocoder.geocode(address, ['stateleg'])
    .then(response => {
      if (response.results.length) {
        return {
          house: response.results[0].fields.state_legislative_districts.house[0].ocd_id,
          senate: response.results[0].fields.state_legislative_districts.senate[0].ocd_id,
        }
      } else {
        // couldn't geolocate the address
        throw new Error(
          JSON.stringify({
            name: "Couldn't locate that Massachusetts address.",
            data: response.data,
          })
        )
      }
    })
    .catch(err => {
      console.error(err);
      throw err;
    }
  );
}

module.exports = geolocate
