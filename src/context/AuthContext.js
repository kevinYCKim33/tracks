import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
// import { AsyncStorage } from 'react-native'; // DEPRECATED!
import AsyncStorage from "@react-native-community/async-storage"; // the updated way
import { navigate } from "../navigationRef";

// all reducers do...just return what the new state is
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin": // both signup and signin uses this...cause reducer wise they're the same thing
      return { errorMessage: "", token: action.payload }; // 0 out error message
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    // console.log(response.data);
    await AsyncStorage.setItem("token", response.data.token); // this needs to be await??
    // where do I do a AsyncStorage.getItem??
    dispatch({ type: "signin", payload: response.data.token });

    // navigate to main flow
    // had to do a lot of hoopla to be able to navigate from a non jsx component
    // alternative is to do it via callback or promise
    navigate("TrackList");
  } catch (err) {
    // might occur if email already taken, password too short, etc.
    // console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => {
  return () => {
    // sign out somehow!
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage }, // actions
  { token: null, errorMessage: "" } // defaultState
);
