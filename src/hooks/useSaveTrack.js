import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { navigate } from "../navigationRef";
// alternatively could do something like
// import {Context as AuthContext} from ...
// and then get JWT from there and then send it in when doing post requests

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate("TrackList"); // could alternatively return a promise and handle routing inside React
    // this outside react navigation thing still seems a bit janky to me
  };

  return [saveTrack]; // community convention to put inside array
};
