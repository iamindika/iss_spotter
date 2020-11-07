const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    

    let ip = JSON.parse(body).ip;
    callback(null, ip);
  
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}?fields=lat,lon`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      let msg = `Status Code ${response.statusCode} when fetching coordinate data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    let latitude = data.lat;
    let longitude = data.lon;
    let coords = {latitude: latitude, longitude: longitude};
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      let msg = `Status Code ${response.statusCode} when fetching my ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body);
    let flyBys = data.response;
    callback(null, flyBys);
  });
};

const nextISSTimesForMyLocation = function(callback) {
 
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
      
    });
    

  });

 

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
