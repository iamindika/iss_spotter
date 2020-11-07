const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

// let myIP = '99.227.2.179';
// let myCoords = {
//   latitude: 43.8668,
//   longitude: -79.2663
// }

// fetchISSFlyOverTimes(myCoords, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log("It worked!\n", data);
//   }
// });


// fetchCoordsByIP(myIP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   } else {
//     console.log(`It worked! Returned geo co-ordinates --> Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
//   }
// });




// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });
