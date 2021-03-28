import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

// shouldTrack: a boolean value to decide whether to keep background tracking location or not
// callback: the function you want to execute every time the position updates
export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // rerendering is not the same as mounting
  // Grider: useEffect has some nasty bugs
  useEffect(() => {
    console.log("useEffect fires!");
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        // basically a background job
        // subscriber: you get a function back from this await
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback // everytime the watchPositionAsync updates, the function you want to execute
          // why isn't this callback() ?
          // my guess is that watchPositionAsync is magical enough
          // that it will fire callback with argument of location
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // just defensive coding
      if (subscriber) {
        subscriber.remove(); // stop the watching process
      }
      subscriber = null;
    }

    return () => {
      // just safeguarding
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]); // run this function when mounting, and also when shouldTrack changes

  return [err];
};
