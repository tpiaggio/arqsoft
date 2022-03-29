const axios = require('axios');

const weather = (address, callback) => {
  axios.get(`http://api.weatherstack.com/current?access_key=cfd6b13a7354f5cf9ce7d15793e73a6f&query=${address}`)
  .then(function (response) {
    if(response.data.error) {
      callback(`Unable to retireve weather data from location ${address}`, undefined);
    } else {
      callback(undefined, response.data);
    }
  })
  .catch(function (error) {
    callback('Unable to retrieve weather data from API', undefined);
  });
};

module.exports = weather;