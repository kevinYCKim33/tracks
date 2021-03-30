import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
// import { AsyncStorage } from 'react-native'; // DEPRECATED!
import AsyncStorage from "@react-native-community/async-storage"; // the updated way
import { navigate } from "../navigationRef"; // some janky method for being able to navigate outside of React

// all reducers do...just return what the new state is
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin": // both signup and signin uses this...cause reducer wise they're the same thing
      return { errorMessage: "", token: action.payload }; // 0 out error message
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

// check to see if JWT is in async in my phone
// this should be the first thing I try though?
// Yes, it gets called in ResolveAuthScreen which is at the top of the navigator stack
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList"); // navigate is built in outside of React; so will handle navigation here
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token); // this needs to be await??
    // where do I do a AsyncStorage.getItem?? A: in tryLocalSignin
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

    // just getting here means the signin was successful
    // response.data.token is the JWT token
    // just store it in localStorage
    await AsyncStorage.setItem("token", response.data.token);
    // and also store it in the useContext store
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    // if signin fails, or no internet connection, it will end up in this catch block
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

// remove from AsyncStorage as well as Context
// and navigate to sign up page then boom you're done
const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow"); // which will kick me out to Signup...hmmm Signin would make more sense
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin }, // actions
  { token: null, errorMessage: "" } // defaultState
);
