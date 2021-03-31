import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

// shouldTrack: a boolean value to decide whether to keep background tracking location or not
// shouldTrack === isFocused || recording
// Plain ol' English: you should keep pinpointing where you're at if you're looking directly at the screen
// or if you're looking away from the screen but recording

// callback: the function you want to execute every time the position updates
// which is now wrapped in a useCallback for reasons that aren't super clear to me yet.

// custom hook that uses some useContext state as a prop
export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // rerendering is not the same as mounting
  // Grider: useEffect has some nasty bugs
  useEffect(() => {
    console.log("useEffect fires!");
    // let subscriber instead of [subscriber, setSubscriber]
    // because nothing in this hypothetical useState is getting consumed or returned by used hook component
    let subscriber;

    // Grider + ESLint: put functions that useEffect uses inside useEffect
    const startWatching = async () => {
      try {
        // is it okay to geolocate you?
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }
        // basically a background job
        // subscriber: you get a function back from this await
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            // every 1 second or every 10m travelled,
            // update the current position
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback // everytime the watchPositionAsync updates, the function you want to execute
          // why isn't this callback() ?
          // my guess is that watchPositionAsync is magical enough
          // that it will fire callback with argument of location
          // every time the position updates, fire a callback function where its lone argument is location containing geocoordinate of current location
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // else, the user did not agree to record the track
      // or the user has navigated away from the screen
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
  }, [shouldTrack, callback]);
  // run useEffect when:
  // 1. upon mounting the app
  // 2. shouldTrack changes; i.e. user has navigated away, user has agreed to start/stop recording
  // 3. when callback (which is wrapped in a useCallback) updates
  // ^ ^ 3 is the most confusing one
  // w/o 3, the location array never builds points
  // because the recording flag is always set to false

  // this is where useCallback kicks in
  // anytime there is an update to the recording flag
  return [err];
};
