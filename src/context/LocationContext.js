import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      // hmm not clearing out current locations or recording???
      // you don't want the dot to reset...that's silly
      // recording has already stopped UI wise when Save Track is prompted
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: "change_name", payload: name });
};
const startRecording = (dispatch) => () => {
  dispatch({ type: "start_recording" });
};
const stopRecording = (dispatch) => () => {
  dispatch({ type: "stop_recording" });
};

// the only super curious one...
// executed in TrackCreateScreen
const addLocation = (dispatch) => (location, recording) => {
  dispatch({ type: "add_current_location", payload: location });
  // recording can't come straight from store...
  // hmm redux has a getState but useContext doesn't?
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};
const reset = (dispatch) => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset }, // actions to export
  { name: "", recording: false, locations: [], currentLocation: null } // default state
);
