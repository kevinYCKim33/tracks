// _ to indicate it's a dev only hack
// how to mock location instead of walking around with a laptop and expo running and testing the app
import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001; //

// fake location reading
const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      // 606 The Max
      longitude: -73.9921148 + increment * tenMetersWithDegrees,
      latitude: 40.7703069 + increment * tenMetersWithDegrees,
    },
  };
};

// setInterval...wow...
// fake out Expo into thinking the location keeps changing
// Grider went through the source code
// won't be any docs for this
// Grider is crazy
let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
